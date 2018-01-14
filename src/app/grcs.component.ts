import { Component, Input } from '@angular/core';
import { getGRCSQuestions } from './grcs-data';
import { RNG } from './rng';
import { GrcsQuestionResponse } from './grcs-question-response';

@Component({
    selector: 'app-grcs',
    templateUrl: './grcs.component.html'
})

export class GrcsComponent {
    @Input() tickCount: number;

    private totalNumQuestions = 20;

    responses: GrcsQuestionResponse[] = [];

    onResponse(response) {
        const numMinutesPlayed = this.tickCount * 5;
        // check if we already have a response for this question this timer tick
        const resp = this.responses.find(r => r.questionId === response.questionId && r.numMinutesPlayed === numMinutesPlayed);
        if (resp) {
            // if we can find it just update the answer
            resp.answer = response.answer;
        } else {
            // otherwise we update the numMinutesPlayed and add it to the collection
            response.numMinutesPlayed = numMinutesPlayed;
            this.responses.push(response);
        }
    }

    submitGrcsAnswers() {

    }

    getQuestionsToDisplay() {
        switch (this.tickCount) {
            case 1:
                return getGRCSQuestions([0, 2, 3]);
            case 2:
                return getGRCSQuestions([1, 4, 5]);
            case 3:
                return getGRCSQuestions([7, 8, 6]);
            case 4:
                return getGRCSQuestions([9, 10, 12]);
            case 5:
                return getGRCSQuestions([13, 11, 14]);
            case 6:
                return getGRCSQuestions([15, 17, 18]);
            case 7:
                return getGRCSQuestions([16, 19, 0]);
            default:
                return this.getRandomQuestions(3);
        }
    }

    private getRandomQuestions(numQuestions: number) {
        const numQs = numQuestions || 3;
        const rng = new RNG(94764);
        const questions = [];
        for (let i = 0; i < numQuestions; i++) {
            questions.push(rng.nextInt(0, this.totalNumQuestions - 1));
        }
        return questions;
    }

}
