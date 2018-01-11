import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { SpinResultService } from './spin-result.service';

/*
 * This is the screen of the slot machine that displays a grid of symbols
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  @Input() numRows: number;
  @Input() resultMap: number[][];

  title = 'Integrator Angular';

/**
 *
 */
constructor(private spinResultService: SpinResultService) {

}

  ngOnInit(): void {
    // we need to get the first grid of symbols to display
    // we will start with a random result map that shows maxCols*maxRows symbols
    this.resultMap = this.spinResultService.getSpinResult();
    // this will depend on the numRows, numCols and the symbolMap
    // the symbolMap is the representation of the SymbolType enum from the server
  }
}
