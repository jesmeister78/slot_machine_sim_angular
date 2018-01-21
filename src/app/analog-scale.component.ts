import { Component, Input, Output } from '@angular/core';
import { getGRCSQuestions } from './popup-questions-data';
import { RNG } from './rng';
import { EventEmitter } from '@angular/core';
import { AnalogScaleResponseCollection, AnalogScaleResponseType } from './analog-scale-response-collection';
import { AnalogScaleResponse } from './analog-scale-response';

@Component({
    selector: 'app-analog-scale',
    template: ''
})

export class AnalogScaleComponent {
    @Input() tickCount: number;
    @Input() timerIntervalMinutes: number;
    @Input() sessionId: string;
    @Output() onAnswersSubmitted = new EventEmitter<AnalogScaleResponseCollection>();

    protected totalNumQuestions = 20;

    responses: AnalogScaleResponse[] = [];

    scoreRange: number[];

    onResponse(response) {
        const numMinutesPlayed = this.tickCount * this.timerIntervalMinutes;
        // check if we already have a response for this question this timer tick
        const resp = this.responses.find(r => r.questionId === response.questionId && r.numMinutesPlayed === numMinutesPlayed);
        if (resp) {
            // if we can find it just update the answer
            resp.answer = response.answer;
        } else {
            // otherwise we update the sessionId and numMinutesPlayed and add it to the collection
            response.sessionId = this.sessionId;
            response.numMinutesPlayed = numMinutesPlayed;
            this.responses.push(response);
        }
    }


    submitAnalogScaleAnswers(responseType: AnalogScaleResponseType) {
        const responseCollection = new AnalogScaleResponseCollection();
        responseCollection.responses = this.responses;
        responseCollection.responseType = responseType;
        this.onAnswersSubmitted.emit(responseCollection);
    }


}
