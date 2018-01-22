import { Component, Input, Output } from '@angular/core';
import { getGRCSQuestions } from './popup-questions-data';
import { RNG } from './rng';
import { AnalogScaleComponent } from './analog-scale.component';
import { EventEmitter } from '@angular/core';
import { AnalogScaleResponseCollection, AnalogScaleResponseType } from './analog-scale-response-collection';
import { OnInit } from '@angular/core';

@Component({
    selector: 'app-grcs',
    templateUrl: './templates/grcs.component.html'
})

export class GrcsComponent extends AnalogScaleComponent implements OnInit {

    protected totalNumQuestions = 20;

    scoreRange: number[] = [1, 2, 3, 4, 5, 6, 7];

    ngOnInit() {
        super.ngOnInit();
        this.responseType = AnalogScaleResponseType.Grcs;
        this.scoreRange  = [1, 2, 3, 4, 5, 6, 7];
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
        const indices = [];
        for (let i = 0; i < numQuestions; i++) {
            indices.push(rng.nextInt(0, this.totalNumQuestions - 1));
        }
        return getGRCSQuestions(indices);
    }

}
