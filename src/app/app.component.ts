import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { SpinResultService } from './spin-result.service';
import { LoggerService } from './logger.service';

/*
 * This is the screen of the slot machine that displays a grid of symbols
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  numRows: number;
  resultMap: number[][];
  // string representation of the symbolType enum from the server
  allSymbolNames: string[];
  // app is waiting on response from server
  isBusy = false;
  // determine whether to hide the symbol display and user interface to show the grcs questionaire
  showGrcs = false;
  // counts the timer ticks
  tickCount: number;
  // timer interval 5 minutes
  timerInterval = 1000 * 60 * 5;

  constructor(private spinResultService: SpinResultService, private loggerService: LoggerService) {

  }

  ngOnInit(): void {
    // we need to get the first grid of symbols to display
    // we will start with a random result map that shows maxCols*maxRows symbols
    this.getResultMap();
    this.loggerService.log('init - default result map: ' + this.resultMap);

    // this will depend on the numRows, numCols and the symbolMap
    // the symbolMap is the representation of the SymbolType enum from the server
    this.allSymbolNames = this.spinResultService.getSymbolNames();

    this.tickCount = 0;

  }

  showGrcsOnTimerTick() {
    setTimeout(() => {
        this.tickCount ++;
        this.showGrcs = true;
    }, this.timerInterval);
  }

  getResultMap() {
    this.isBusy = true;
    this.spinResultService.getSpinResultAsync().then( results => {
      this.resultMap = results;
      this.isBusy = false;
    });
  }

  redraw(doEvent: boolean) {
    this.getResultMap();
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
