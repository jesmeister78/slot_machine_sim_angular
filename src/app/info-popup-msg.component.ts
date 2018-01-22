import { Component, Input, Output } from '@angular/core';

@Component({
    selector: 'app-info-popup-msg',
    templateUrl: './templates/info-popup-msg.component.html'
})

export class InfoPopUpMsgComponent {

    @Input() msgText: string;
}
