import { Component } from '@angular/core';
import { SpinResultService } from './spin-result.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { DefaultParams } from './default-params';

@Component({
    selector: 'app-user-interface',
    templateUrl: 'user-interface.component.html',
    styleUrls: ['./user-interface.component.css']
})

export class UserInterfaceComponent implements OnInit {

    resultMap: number[][];
    betAmount: number;
    balance: number;
    defaults: DefaultParams;

    ngOnInit(): void {
        // get the initial result map from the server
        this.resultMap = this.spinResultService.getSpinResult();
        // get the defaults from the server
        this.defaults = this.spinResultService.getDefaults();
        // initialise the balance
        this.balance = this.defaults.initialBalance;
    }
    /**
     *
     */
    constructor(private spinResultService: SpinResultService) {
    }

    spin(amt) {
        if (this.validateBetAmount(amt)) {
            this.balance -= amt;
            alert('balance: ' + this.balance + 'amt: ' + amt);
        }
    }

    validateBetAmount(val) {
        if (isNaN(val)) {
            alert('cannot bet that');
            this.betAmount = 0;
            return false;
        }
        return true;
    }
}
