import { Component, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';

import { SpinResultService } from './spin-result.service';
import { DefaultParams } from './default-params';
import { LoggerService } from './logger.service';
import { BetRecord } from './bet-record';

@Component({
    selector: 'app-user-interface',
    templateUrl: 'user-interface.component.html',
    styleUrls: ['./user-interface.component.css']
})

export class UserInterfaceComponent implements OnInit {

    @Input('isBusy') isBusy: boolean;
    @Input() balance: number;

    @Output() onSpin = new EventEmitter<BetRecord>();
    @Output() onSessionEnd = new EventEmitter<boolean>();

    betAmount: number;
    defaults: DefaultParams;
    numRows: number;
    playerId: string;

    ngOnInit(): void {
        // get the defaults from the server
        this.defaults = this.spinResultService.getDefaults();
    }
    /**
     *
     */
    constructor(private spinResultService: SpinResultService, private loggerService: LoggerService) {
    }

    getTotalBetCost(): number {
        return this.betAmount || 0 * this.numRows || 0;
    }

    spin(amt) {
        if (this.validateBetAmount(amt)) {
            this.loggerService.log('spin: bet amount: ' + amt);
            const bet = this.createBetRecord();
            // emit an event so that the app component can redraw the symbol map
            this.onSpin.emit(bet);
        }
    }

    endSession() {
        this.loggerService.log('Gambling session ended');
        this.onSessionEnd.emit(true);
    }

    createBetRecord() {

        const bet = new BetRecord();
        const dt = new Date();
        const utcDate = dt.toUTCString();

        bet.balance = this.balance;
        bet.betAmount = this.betAmount;
        bet.numRows = this.numRows;
        bet.playerId = this.playerId;
        bet.timestamp = utcDate;

        return bet;
    }

    validateBetAmount(val) {
        if (isNaN(val)) {
            this.loggerService.log('spin: invalid bet amount: ' + val);
            this.betAmount = 0;
            return false;
        }
        return true;
    }
}
