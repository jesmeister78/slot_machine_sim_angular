import { Component } from '@angular/core';

@Component({
    selector: 'app-user-interface',
    templateUrl: 'user-interface.component.html'
})

export class UserInterfaceComponent {

    betAmount = 0;

    spin() {
        alert('yo!');
    }

    validateBetAmount(val) {
        if (isNaN(val)) {
            alert('cannot bet that');
            this.betAmount = 0;
        }
    }
}
