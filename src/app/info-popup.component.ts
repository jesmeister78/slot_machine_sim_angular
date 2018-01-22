import { Component, Input, EventEmitter } from '@angular/core';
import { getInfoMessages } from './info-popup-data';
import { BasePopUp } from './base-popup';

@Component({
    selector: 'app-info-popup',
    templateUrl: './templates/info-popup.component.html'
})

export class InfoPopUpComponent extends BasePopUp {
    @Input() tickCount: number;

    getMessagesToDisplay() {
        return getInfoMessages(this.tickCount);
    }
}
