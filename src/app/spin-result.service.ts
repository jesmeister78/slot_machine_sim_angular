import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';


import { spinResult } from './test-result-map';
import { getDefaults } from './test-result-map';
import { getSymbolNames } from './test-result-map';
import {RNG} from './rng';
import { LoggerService } from './logger.service';

@Injectable()
export class SpinResultService {

    private spinResultUrl = 'http://localhost:5513/api/values';
    /**
     *
     */
    constructor(private http: Http, private loggerService: LoggerService) {
    }

    getSpinResultAsync(): Promise<number[][]> {
        this.loggerService.log(`getSpinResultAsync() - getting resultMap from server`);
        return this.http.get(this.spinResultUrl)
        .toPromise()
        .then(response => {
            const resultMap = response.json().resultMap as number[][];
            this.loggerService.log(`getSpinResultAsync() - result map returned from server: ${resultMap}`);
            return resultMap;
        },
        error => {
            this.loggerService.log(`getSpinResultAsync() - error returned from server: ${error}`);
            return Promise.reject('Server returned an error please check the console');
        });



         /*  const resultMap = this.getSpinResult();

         return new Promise<number[][]>(resolve => {
             setTimeout(() => {
                 resolve (resultMap);
             }, 1500);
         }); */
     }

    getSymbolNames() {
        return getSymbolNames();
   }

   getSpinResult() {
       const rng = new RNG(242434343);
        const resultMap = spinResult();
        for (let i = 0; i < resultMap.length; i++) {
            for (let j = 0; j < resultMap[0].length; j++) {
                resultMap[i][j] = rng.nextInt(0, 8);
            }
        }
        return  resultMap;
   }

   getDefaults() {
        return getDefaults();
   }
}

