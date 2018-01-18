import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { SpinResultService } from './spin-result.service';
import { LoggerService } from './logger.service';
import { BetRecord } from './bet-record';
import { GrcsQuestionResponse } from './grcs-question-response';

/*
 * This is the screen of the slot machine that displays a grid of symbols
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
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

  balance: number;

  numRows: number;
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

  // determine whether to show the popup for the Information player group
  showInfoPopUp = false;
  // determine whether to show the popup for the SelfAppraisal player group
  showStatsPopUp = false;
  // counts the timer ticks
  tickCount: number;
  // number of minutes between timer ticks - from server
  timerIntervalMinutes: number;
  // timer interval in miliseconds
  timerInterval: number;
  playerId: string;
  isRegistered: boolean;

  constructor(private spinResultService: SpinResultService, private loggerService: LoggerService) {  }

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
    this.init();
    this.loggerService.log(`init - default result map: ${this.resultMap}`);

  }

  showPopUpOnTimerTick() {
      setTimeout(() => {
          this.tickCount ++;
          if (this.isInControlGroup()) {
            this.showGrcs = true;
          }
          if (this.isInInformationGroup()) {
            this.showInfoPopUp = true;
          }
          if (this.isInSelfAppraisalGroup()) {
            this.showStatsPopUp = true;
          }
      }, this.timerInterval);
  }

  // once the user closes the info popup they need to answer the grcs questions
  closeInfoPopUp() {
      this.showInfoPopUp = false;
      this.showStatsPopUp = false;
      this.showGrcs = true;
  }

  updateGrcsResponses(responses: GrcsQuestionResponse[]) {
    // TODO: need to send the responses somewhere

    // hide the grcs panel so player can go back to spinning
    this.showGrcs = false;

    // start the timer again so the next set of grcs questions can be displayed
    this.showPopUpOnTimerTick();
  }

  init() {
    this.isBusy = true;
    this.spinResultService.initAsync()
      .then( result => {
        this.resultMap = result.resultMap;
        this.balance = result.initialBalance;
        this.playerGroup = result.playerGroup;
        this.timerIntervalMinutes = result.timerInterval;
        this.timerInterval = 1000 * 60 * this.timerIntervalMinutes;

        this.isBusy = false;
        this.showPopUpOnTimerTick();
      });
  }

  getBetResult(betAmount: number, numRows: number) {
    this.isBusy = true;
    this.spinResultService.getBetResultAsync(betAmount, numRows)
      .then( result => {
        this.resultMap = result.resultMap;
        this.balance += result.winAmount;

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
