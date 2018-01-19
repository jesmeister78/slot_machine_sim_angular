import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';


import { spinResult } from './test-result-map';
import { getDefaults } from './test-result-map';
import { getSymbolNames } from './test-result-map';
import {RNG} from './rng';
import { LoggerService } from './logger.service';
import { BetResultModel } from './bet-result.model';
import { InitModel } from './init.model';

@Injectable()
export class SpinResultService {

    private spinResultUrl = 'http://localhost:21452/api/values';
    private betResultUrl = 'http://localhost:21452/api/values/';
    /**
     *
     */
    constructor(private http: Http, private loggerService: LoggerService) {
    }

    initAsync(): Promise<InitModel> {
        this.loggerService.log(`getSpinResultAsync() - getting resultMap from server`);
        return this.http.get(this.spinResultUrl)
        .toPromise()
        .then(response => {
            const result = response.json() as InitModel;
            this.loggerService.log(`getSpinResultAsync() - result map returned from server: ${result.resultMap}`);
            return result;
        },
        error => {
            this.loggerService.log(`getSpinResultAsync() - error returned from server: ${error}`);
            return Promise.reject('Server returned an error please check the console');
        });
    }

    getBetResultAsync(betAmount: number, numRows: number): Promise<BetResultModel> {
        this.loggerService.log(`getSpinResultAsync() - getting bet result from server`);
        const betResulturl = this.spinResultUrl + `/${betAmount}/${numRows}`;
        return this.http.get(betResulturl)
        .toPromise()
        .then(response => {
            const resp = response.json();
            const resultMap = resp.resultMap as number[][];
            const winAmount = resp.winAmount as number;
            const betResult = new BetResultModel();
            betResult.resultMap = resultMap;
            betResult.winAmount = winAmount;
            this.loggerService.log(`getBetResultAsync() - result map returned from server: ${resultMap}`);
            return betResult;
        },
        error => {
            this.loggerService.log(`getBetResultAsync() - error returned from server: ${error}`);
            return Promise.reject('Server returned an error please check the console');
        });
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

