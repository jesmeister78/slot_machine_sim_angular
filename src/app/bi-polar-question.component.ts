import { Component, Input, Output } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { EventEmitter } from '@angular/core';
import { AnalogScaleQuestionComponent } from './analog-scale-question.component';

@Component({
    selector: 'app-bi-polar-question',
    templateUrl: './bi-polar-question.component.html'
})

export class BiPolarQuestionComponent extends AnalogScaleQuestionComponent {

    @Input() negativePole: string;
    @Input() positivePole: string;

}
