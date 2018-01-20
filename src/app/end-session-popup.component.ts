import { Component, Input, EventEmitter, Output } from '@angular/core';
import { BasePopUp } from './base-popup';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'app-end-session-popup',
    templateUrl: './end-session-popup.component.html'
})

export class EndSessionPopUpComponent implements OnInit {
    showEndSession: boolean;
    showConfirm: boolean;
    @Input() timePlayed: number;
    @Input() numBets: number;
    @Output() onSessionEndSubmitted = new EventEmitter<boolean>();
    @Output() onSessionEndCancelled = new EventEmitter<boolean>();

    ngOnInit(): void {
        this.showConfirm = true;
        this.showEndSession = false;
    }

    cancel() {
        this.onSessionEndCancelled.emit(true);
    }

    confirmSessionEnd() {
        this.showConfirm = false;
        this.showEndSession = true;
    }

    submitEndSession() {

    }
}
