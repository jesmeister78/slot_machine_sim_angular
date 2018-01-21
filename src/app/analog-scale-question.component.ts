import { Component, Input, Output } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { EventEmitter } from '@angular/core';
import { AnalogScaleResponse } from './analog-scale-response';

@Component({
    selector: 'app-analog-scale-question',
    template: ''
})

export class AnalogScaleQuestionComponent {

    @Input() questionText: string;
    @Input() questionId: number;
    @Input() scoreRange: number[];
    @Output() onResponse = new EventEmitter<AnalogScaleResponse>();

    answer: number;

    updateResponse(value) {
        // update local member so we can keep track of which radio button is checked
        this.answer = value;

        // update response collection in parent for sending to server
        const response = new AnalogScaleResponse();
        response.questionId = this.questionId;
        response.answer = value;

        this.onResponse.emit(response);
    }



}
