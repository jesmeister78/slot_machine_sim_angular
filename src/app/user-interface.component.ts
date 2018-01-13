import { Component, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';

import { SpinResultService } from './spin-result.service';
import { DefaultParams } from './default-params';
import { LoggerService } from './logger.service';

@Component({
    selector: 'app-user-interface',
    templateUrl: 'user-interface.component.html',
    styleUrls: ['./user-interface.component.css']
})

export class UserInterfaceComponent implements OnInit {

    @Input() showSpinButton: boolean;
    @Output() redraw = new EventEmitter<boolean>();
    betAmount: number;
    balance: number;
    defaults: DefaultParams;

    ngOnInit(): void {
        // get the defaults from the server
        this.defaults = this.spinResultService.getDefaults();
        // initialise the balance
        this.balance = this.defaults.initialBalance;
    }
    /**
     *
     */
    constructor(private spinResultService: SpinResultService, private loggerService: LoggerService) {
    }

    spin(amt) {
        if (this.validateBetAmount(amt)) {
            this.loggerService.log('spin: bet amount: ' + amt);
            // emit an event so that the app component can redraw the symbol map
            this.redraw.emit(true);
            this.balance -= amt;
        }
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
