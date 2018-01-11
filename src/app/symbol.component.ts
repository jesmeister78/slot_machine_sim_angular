import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-symbol',
    templateUrl: './symbol.component.html'
})

export class SymbolComponent {

    @Input() symbolName: string;
}
