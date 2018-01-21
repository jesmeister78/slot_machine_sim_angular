import { Component, Input, Output } from '@angular/core';
import { getBiPolarQuestions } from './popup-questions-data';
import { RNG } from './rng';
import { AnalogScaleResponse } from './analog-scale-response';
import { EventEmitter } from '@angular/core';
import { GrcsComponent } from './grcs.component';
import { AnalogScaleComponent } from './analog-scale.component';
import { AnalogScaleResponseType } from './analog-scale-response-collection';

@Component({
    selector: 'app-bi-polar',
    templateUrl: './bi-polar.component.html'
})

export class BiPolarComponent extends AnalogScaleComponent {
    scoreRange: number[] = [-3, -2, -1, 0, 1, 2, 3];

    getQuestionsToDisplay() {
        return getBiPolarQuestions();
    }

    getBiPolarStatement(question) {
        return `${question.negative} vs ${question.positive}`;
    }


    submitBiPolarAnswers() {
        const responseType = AnalogScaleResponseType.BiPolar;
        this.submitAnalogScaleAnswers(responseType);
    }

}
