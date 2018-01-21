import { AnalogScaleResponse } from './analog-scale-response';

export class AnalogScaleResponseCollection {
    responses: AnalogScaleResponse[] = [];
    responseType: AnalogScaleResponseType;
}

export enum AnalogScaleResponseType {
    Grcs,
    BiPolar
}
