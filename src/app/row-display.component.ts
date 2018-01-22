import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'app-row',
    templateUrl: './templates/row-display.component.html'
})

export class RowComponent {
    @Input() symbolNames: string[];



}
