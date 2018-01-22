import { Component, Input, Output } from '@angular/core';
import { getGRCSQuestions } from './popup-questions-data';
import { RNG } from './rng';
import { EventEmitter } from '@angular/core';
import { AnalogScaleResponseCollection, AnalogScaleResponseType } from './analog-scale-response-collection';
import { AnalogScaleResponse } from './analog-scale-response';
import { OnInit } from '@angular/core';
import { AnalogScaleQuestion } from './analog-scale-question';

@Component({
    selector: 'app-analog-scale',
    template: ''
})

export class AnalogScaleComponent implements OnInit {
    @Input() tickCount: number;
    @Input() timerIntervalMinutes: number;
    @Input() sessionId: string;
    @Output() onAnswersSubmitted = new EventEmitter<AnalogScaleResponseCollection>();

    protected totalNumQuestions = 20;
    questions: AnalogScaleQuestion[];
    responses: AnalogScaleResponse[];
    responseType: AnalogScaleResponseType;

    scoreRange: number[];

    ngOnInit(): void {
        this.questions = [];
        this.responses = [];
    }


    submitAnalogScaleAnswers() {
        const responseCollection = new AnalogScaleResponseCollection();
        const numMinutesPlayed = this.timerIntervalMinutes * this.tickCount;
        responseCollection.responseType = this.responseType;

        this.questions.forEach(q => {
            const response = new AnalogScaleResponse();
            response.answer = q.answer;
            response.numMinutesPlayed = numMinutesPlayed;
            response.sessionId = this.sessionId;
        });

        this.onAnswersSubmitted.emit(responseCollection);
    }


}
