import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { SpinResultService } from './spin-result.service';
import { LoggerService } from './logger.service';
import { BetRecord } from './bet-record';
import { AnalogScaleResponse } from './analog-scale-response';
import { AnalogScaleResponseCollection, AnalogScaleResponseType } from './analog-scale-response-collection';

/*
 * This is the screen of the slot machine that displays a grid of symbols
 */

@Component({
  selector: 'app-root',
  templateUrl: './templates/app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  // players are randomised into 3 groups - from server
  playerGroup: number;

  playerGroups = {
    // answer GRCS questions only
    'Control': 1,
    // see the fact/fiction messages then answer the GRCS questions
    'Information': 2,
    // see how long they have been playing and how many bets they have made then answer the GRCS questions
    'SelfAppraisal': 3
  };

  // ui defaults
  defaultBetAmount: number;
  defaultNumRows: number;

  balance: number;

  // positions of the symbols determined by the server
  resultMap: number[][];
  // string representation of the symbolType enum from the server
  allSymbolNames: string[];
  // collection of the details of the bet results for each spin
  betResults: BetRecord[];
  // app is waiting on response from server
  isBusy = false;
  // determine whether to hide the symbol display and user interface to show the grcs questionaire
  showGrcs = false;
  // determine whether to hide the symbol display and user interface to show the bipolar questionaire
  showBiPolar = false;

  // determine whether to show the popup for the Information player group
  showInfoPopUp = false;
  // determine whether to show the popup for the SelfAppraisal player group
  showStatsPopUp = false;
  // determine whether to show the popup for when the player chooses to end the session
  showEndSessionPopUp = false;
  // counts the timer ticks
  tickCount: number;
  // number of minutes between timer ticks - from server
  timerIntervalMinutes: number;
  // timer interval in miliseconds
  timerInterval: number;
  // need to pass this to server for all requests for this session
  sessionId: string;
  playerId: string;
  isRegistered: boolean;

  // shut it down
  isGameOver = false;

  constructor(private spinResultService: SpinResultService, private loggerService: LoggerService) { }

  ngOnInit(): void {
    // initialise the collection of bet results
    this.betResults = [];
    // player must register by entering their email before they start playing
    this.isRegistered = false;
    // this will depend on the numRows, numCols and the symbolMap
    // the symbolMap is the representation of the SymbolType enum from the server
    this.allSymbolNames = this.spinResultService.getSymbolNames();

    this.tickCount = 0;
  }

  startPlaying(playerId: string) {
    this.playerId = playerId;
    this.isRegistered = true;
    // we need to get the first grid of symbols to display
    // we will start with a random result map that shows maxCols*maxRows symbols
    this.init(playerId);

  }

  stopPlaying() {
    this.isGameOver = true;
    this.isRegistered = false;
  }

  showPopUpOnTimerTick() {
    setTimeout(() => {
      if (!this.isGameOver) {
        this.tickCount++;
        if (this.isInControlGroup()) {
          this.showBiPolar = true;
        }
        if (this.isInInformationGroup()) {
          this.showInfoPopUp = true;
        }
        if (this.isInSelfAppraisalGroup()) {
          this.showStatsPopUp = true;
        }
      }
    }, this.timerInterval);
  }

  allPopUpsClosed() {
    return !this.showGrcs && !this.showBiPolar && !this.showInfoPopUp && !this.showStatsPopUp && !this.showEndSessionPopUp;
  }

  closeAllPopUps() {
    this.showInfoPopUp = false;
    this.showStatsPopUp = false;
    this.showEndSessionPopUp = false;
    this.showBiPolar = false;
    this.showGrcs = false;
  }

  closeBiPolarPopUp() {
    this.showInfoPopUp = false;
    this.showStatsPopUp = false;
    this.showEndSessionPopUp = false;
    this.showBiPolar = false;
  }

  // once the user closes the info popup they need to answer the bipolar questions
  closeInfoPopUp() {
    this.showInfoPopUp = false;
    this.showStatsPopUp = false;
    this.showEndSessionPopUp = false;
    this.showGrcs = false;
    this.showBiPolar = true;
  }

  updateAnalogScaleResponses(responseCollection: AnalogScaleResponseCollection) {
    // TODO: need to send the responses somewhere
    this.spinResultService.saveAnalogScaleResponses(responseCollection.responses);
    // hide the appropriate popup panel
    if (responseCollection.responseType === AnalogScaleResponseType.BiPolar) {
      // this.closeBiPolarPopUp();
      this.closeAllPopUps();
      // once they have submitted bipolar responses
      // start the timer again so the next set of  questions can be displayed
      this.showPopUpOnTimerTick();
    } else if (responseCollection.responseType === AnalogScaleResponseType.Grcs) {
      this.showGrcs = false;
      this.showEndSessionPopUp = true;
    }
  }

  init(playerId: string) {
    this.isBusy = true;
    this.spinResultService.initAsync(playerId)
      .then(result => {
        this.sessionId = result.sessionId;
        this.resultMap = result.resultMap;
        this.balance = result.initialBalance;
        this.playerGroup = result.playerGroup;
        this.timerIntervalMinutes = result.timerInterval;
        this.timerInterval = 1000 * 60 * this.timerIntervalMinutes;
        this.defaultBetAmount = result.defaultBetAmount;
        this.defaultNumRows = result.defaultNumRows;
        this.isBusy = false;
        this.showPopUpOnTimerTick();
      });
  }


  getBetResult(betAmount: number, numRows: number) {
    this.isBusy = true;
    this.spinResultService.getBetResultAsync(betAmount, numRows, this.sessionId)
      .then(result => {
        this.resultMap = result.resultMap;
        this.balance = parseFloat((this.balance + result.winAmount).toFixed(2));

        this.isBusy = false;
      });
  }

  doSpin(betRecord: BetRecord) {
    // log the record of the spin
    this.betResults.push(betRecord);
    this.loggerService.log(`doSpin() -
      betAmount: ${betRecord.betAmount}
      numRows: ${betRecord.numRows},
      balance: ${betRecord.balance},
      winAmount: ${betRecord.winAmount},
      timestamp: ${betRecord.timestamp},
      playerId`);
    // get the new symbol map to redraw
    this.getBetResult(betRecord.betAmount, betRecord.numRows);
  }

  endSession() {
    this.closeAllPopUps();
    this.showGrcs = true;
  }

  getNumBets() {
    return this.betResults.length;
  }

  getTimePlayed() {
    return this.tickCount * this.timerIntervalMinutes;
  }

  getRowSymbolNames(rowIndex: number) {
    const rowSymbolNames: string[] = [];
    for (let i = 0; i < this.resultMap[rowIndex].length; i++) {
      rowSymbolNames.push(this.allSymbolNames[this.resultMap[rowIndex][i]]);
    }
    // alert(rowSymbolNames);
    return rowSymbolNames;
  }

  private isInControlGroup() {
    return this.playerGroup === this.playerGroups.Control;
  }
  private isInInformationGroup() {
    return this.playerGroup === this.playerGroups.Information;
  }
  private isInSelfAppraisalGroup() {
    return this.playerGroup === this.playerGroups.SelfAppraisal;
  }
}
