import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
    selector: 'app-row',
    templateUrl: './templates/row-display.component.html'
})

export class RowComponent {
    @Input() symbolNames: string[];



}
