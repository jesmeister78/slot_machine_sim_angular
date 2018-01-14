import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html'
})

export class RegistrationComponent {

    @Output() onPlayerRegistered = new EventEmitter<string>();

    playerId: string;

    registerPlayer() {
        this.onPlayerRegistered.emit(this.playerId);
    }
}
