import { Component, Output, EventEmitter } from '@angular/core';

export class BasePopUp {
    @Output() onPopUpClosed = new EventEmitter<boolean>();

    closePopUp() {
        this.onPopUpClosed.emit(true);
    }
}
