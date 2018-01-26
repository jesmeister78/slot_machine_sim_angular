import { Component, Input, EventEmitter, Output } from '@angular/core';
import { BasePopUp } from './base-popup';
import { OnInit } from '@angular/core';
import { EndSessionCommand } from './end-session-command';
import { SpinResultService } from './spin-result.service';

@Component({
    selector: 'app-end-session-popup',
    templateUrl: './templates/end-session-popup.component.html'
})

export class EndSessionPopUpComponent implements OnInit {
    // control visibility of confirm and final popups
    showEndSession: boolean;
    showConfirm: boolean;

    @Input() sessionId: string;
    @Input() finalBalance: number;
    @Input() totalNumBets: number;
    @Output() onSessionEndCancelled = new EventEmitter<boolean>();

    constructor(private spinResultService: SpinResultService) { }

    ngOnInit(): void {
        this.showConfirm = true;
        this.showEndSession = false;
    }

    cancel() {
        this.onSessionEndCancelled.emit(true);
    }

    confirmSessionEnd() {
        const cmd = new EndSessionCommand();
        cmd.sessionId = this.sessionId;
        cmd.finalBalance = this.finalBalance;
        cmd.totalNumBets = this.totalNumBets;
        this.spinResultService.finaliseSession(cmd)
          .then(result => {
            this.showConfirm = false;
            this.showEndSession = true;
          });
    }
}
