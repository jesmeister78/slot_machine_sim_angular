import { Component, Input, Output } from '@angular/core';
import { getInfoMessages } from './info-popup-data';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'app-info-popup',
    templateUrl: './info-popup.component.html'
})

export class InfoPopUpComponent {
    @Input() tickCount: number;

    @Output() onPopUpClosed = new EventEmitter<boolean>();

    closePopUp() {
        this.onPopUpClosed.emit(true);
    }

    getMessagesToDisplay() {
        return getInfoMessages(this.tickCount);
    }
}
