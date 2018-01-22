import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
    selector: 'app-symbol',
    templateUrl: './templates/symbol.component.html'
})

export class SymbolComponent  implements OnInit {

    @Input() symbolName: string;

    imgSrc: string;

    /*
    "'../assets/' + symbolName + '.gif'"
    */
    ngOnInit(): void {
        this.imgSrc = '../assets/' + this.symbolName + '.gif';
    }

   /*  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        for (const propName in changes) {
            if (propName === 'symbolName') {
                const changedProp = changes[propName];
                const to = JSON.stringify(changedProp.currentValue);
                this.imgSrc = '../assets/' + this.symbolName + '.gif';
            }
        }
      } */
}
