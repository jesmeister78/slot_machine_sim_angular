import { Component, Input, EventEmitter } from '@angular/core';
import { getInfoMessages } from './info-popup-data';
import { BasePopUp } from './base-popup';

@Component({
    selector: 'app-stats-popup',
    templateUrl: './stats-popup.component.html'
})

export class StatsPopUpComponent extends BasePopUp {
    @Input() timePlayed: number;
    @Input() numBets: number;
}
