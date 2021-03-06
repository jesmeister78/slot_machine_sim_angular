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
    responseType: AnalogScaleResponseType;
    allQuestionsAnswered: boolean;
    scoreRange: number[];

    ngOnInit(): void {
        this.questions = [];
        this.allQuestionsAnswered = false;
    }

    checkAllQuestionsAnswered(): void {
        let answered = true;
        this.questions.forEach(q => {
            if (q.answer === undefined) {
                answered = false;
            }
        });
        this.allQuestionsAnswered = answered;
    }

    submitAnalogScaleAnswers() {
        const responseCollection = new AnalogScaleResponseCollection();
        const numMinutesPlayed = this.timerIntervalMinutes * this.tickCount;
        responseCollection.responseType = this.responseType;

        this.questions.forEach(q => {
            const response = new AnalogScaleResponse();
            response.questionId = q.questionId;
            response.answer = q.answer;
            response.numMinutesPlayed = numMinutesPlayed;
            response.sessionId = this.sessionId;
            // add the responses to the collection
            responseCollection.responses.push(response);
        });
        // clear the questions collection
        this.questions = [];
        // let the app know we're ready to send the responses to the server
        this.onAnswersSubmitted.emit(responseCollection);
    }
}
