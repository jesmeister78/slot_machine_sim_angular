import { Component, Input, Output } from '@angular/core';
import { getBiPolarQuestions } from './popup-questions-data';
import { RNG } from './rng';
import { AnalogScaleResponse } from './analog-scale-response';
import { EventEmitter } from '@angular/core';
import { GrcsComponent } from './grcs.component';
import { AnalogScaleComponent } from './analog-scale.component';
import { AnalogScaleResponseType } from './analog-scale-response-collection';
import { OnInit } from '@angular/core';

@Component({
    selector: 'app-bi-polar',
    templateUrl: './templates/bi-polar.component.html'
})

export class BiPolarComponent extends AnalogScaleComponent implements OnInit {
    scoreRange: number[] = [-3, -2, -1, 0, 1, 2, 3];

    ngOnInit() {
        super.ngOnInit();
        this.responseType = AnalogScaleResponseType.BiPolar;
        this.scoreRange =  [-3, -2, -1, 0, 1, 2, 3];
        this.questions = this.getQuestionsToDisplay();
    }

    getQuestionsToDisplay() {
        return getBiPolarQuestions();
    }

    getBiPolarStatement(question) {
        return `${question.negative} vs ${question.positive}`;
    }
}
