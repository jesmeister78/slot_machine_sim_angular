import { Component, Input, Output } from '@angular/core';
import { getInfoMessages } from './info-popup-data';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'app-stats-popup',
    templateUrl: './stats-popup.component.html'
})

export class StatsPopUpComponent {
    @Input() timePlayed: number;
    @Input() numBets: number;

    @Output() onPopUpClosed = new EventEmitter<boolean>();

    closePopUp() {
        this.onPopUpClosed.emit(true);
    }
}
