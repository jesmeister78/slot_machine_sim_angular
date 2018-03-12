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
    templateUrl: './templates/user-interface.component.html',
    styleUrls: ['./user-interface.component.css']
})

export class UserInterfaceComponent implements OnInit {

    @Input('isBusy') isBusy: boolean;
    @Input() balance: number;
    @Input() betAmount: number;
    // @Input() defaultNumRows: number;
    @Output() onSpin = new EventEmitter<BetRecord>();
    @Output() onSessionEnd = new EventEmitter<boolean>();
    _defaultNumRows: number;

    @Input()
    set defaultNumRows(defaultNumRows: number) {
        // populate the model for the select
        for (let i = 1; i <= defaultNumRows; i++) {
            this.rows.push(i);
        }
        // set the local var
        this._defaultNumRows = defaultNumRows;
        // set the default selection
        this.numRows = defaultNumRows;
    }
    // get defaultNumRows(): number { return this._defaultNumRows; }
    numRows: number;
    rows: number[];
    defaults: DefaultParams;
    playerId: string;

    get totalBetCost(): number { return this.betAmount * this.numRows; }

    ngOnInit(): void {
        // get the defaults from the server
        this.defaults = this.spinResultService.getDefaults();
        this.rows = [];
    }
    /**
     *
     */
    constructor(private spinResultService: SpinResultService, private loggerService: LoggerService) {
    }

    changeNumRows(newNum: number) {
        this.numRows = newNum;
    }

    spin() {
        if (this.validateBetAmount()) {
            this.loggerService.log(`spin: bet amount: ${this.betAmount}`);
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

    validateBetAmount() {
        let errorMsg = '';
        if (this.totalBetCost > this.balance) {
            errorMsg = 'spin: bet amount cannot exceed balance';
        }

        if (isNaN(this.betAmount) || this.betAmount <= 0) {
            errorMsg = 'spin: invalid bet amount: ' + this.betAmount;
        }

        if (errorMsg) {
            this.loggerService.log(errorMsg);
            this.betAmount = 0;
            return false;
        }
        return true;
    }
}
