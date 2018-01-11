import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { SpinResultService } from './spin-result.service';

@Component({
    selector: 'app-row',
    templateUrl: './row.component.html'
})

export class RowComponent {
    @Input() rowSymbols: number[];

    constructor(private spinResultService: SpinResultService) {

    }

    getRowSymbolNames() {
        const rowSymbolNames: string[] = [];
        const allSymbolNames = this.spinResultService.getSymbolNames();
        for (let i = 0; i < this.rowSymbols.length; i++) {
          rowSymbolNames.push(allSymbolNames[this.rowSymbols[i]]);
        }
        // alert(rowSymbolNames);
        return rowSymbolNames;
      }
}
