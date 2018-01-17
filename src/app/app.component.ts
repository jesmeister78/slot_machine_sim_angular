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
  // counts the timer ticks
  tickCount: number;
  // timer interval 5 minutes
  timerInterval = 1000 * 60 * 5;
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
    this.getResultMap();
    this.loggerService.log(`init - default result map: ${this.resultMap}`);
    this.showGrcsOnTimerTick();

  }

  showGrcsOnTimerTick() {
    setTimeout(() => {
        this.tickCount ++;
        this.showGrcs = true;
    }, this.timerInterval);
  }

  updateGrcsResponses(responses: GrcsQuestionResponse[]) {
    // TODO: need to send the responses somewhere

    // hide the grcs panel so player can go back to spinning
    this.showGrcs = false;

    // start the timer again so the next set of grcs questions can be displayed
    this.showGrcsOnTimerTick();
  }

  getResultMap() {
    this.isBusy = true;
    this.spinResultService.getSpinResultAsync()
      .then( result => {
        this.resultMap = result.resultMap;
        this.balance = result.initialBalance;

        this.isBusy = false;
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

  getRowSymbolNames(rowIndex: number) {
    const rowSymbolNames: string[] = [];
    for (let i = 0; i < this.resultMap[rowIndex].length; i++) {
      rowSymbolNames.push(this.allSymbolNames[this.resultMap[rowIndex][i]]);
    }
    // alert(rowSymbolNames);
    return rowSymbolNames;
  }
}
