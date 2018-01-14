import { Component, Input, Output } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { EventEmitter } from '@angular/core';
import { GrcsQuestionResponse } from './grcs-question-response';

@Component({
    selector: 'app-grcs-question',
    templateUrl: './grcs-question.component.html'
})

export class GrcsQuestionComponent {

    @Input() questionText: string;
    @Input() questionId: number;
    @Output() onResponse = new EventEmitter<GrcsQuestionResponse>();

    answer: number;

    updateResponse(value) {
        const response = new GrcsQuestionResponse();
        response.questionId = this.questionId;
        response.answer = value;

        this.onResponse.emit(response);
    }

}
