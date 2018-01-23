import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';


import { spinResult } from './test-result-map';
import { getDefaults } from './test-result-map';
import { getSymbolNames } from './test-result-map';
import { RNG } from './rng';
import { LoggerService } from './logger.service';
import { BetResultModel } from './bet-result.model';
import { InitModel } from './init.model';
import { SaveResponseModel } from './save-response.model';
import { AnalogScaleResponse } from './analog-scale-response';

@Injectable()
export class SpinResultService {

    // private apiUrl = 'http://localhost:21452/api/values';
    private apiUrl = 'https://slotmachineapidotnetcore2.azurewebsites.net/api';

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    /**
     *
     */
    constructor(private http: Http, private loggerService: LoggerService) {
    }

    initAsync(playerId: string): Promise<InitModel> {
        this.loggerService.log(`getSpinResultAsync() - getting resultMap from server`);
        const initUrl = `${this.apiUrl}/values/${playerId}`;
        return this.http.get(initUrl)
            .toPromise()
            .then(response => {
                const result = response.json() as InitModel;
                this.loggerService.log(`initAsync() - result map returned from server: ${result.resultMap}`);
                return result;
            },
            error => {
                this.loggerService.log(`initAsync() - error returned from server: ${error}`);
                return Promise.reject('Server returned an error please check the console');
            });
    }

    getBetResultAsync(betAmount: number, numRows: number, sessionId: string): Promise<BetResultModel> {
        this.loggerService.log(`getBetResultAsync() - getting bet result from server`);
        const betResulturl = `${this.apiUrl}/values/${betAmount}/${numRows}/${sessionId}`;
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

    saveAnalogScaleResponses(responses: AnalogScaleResponse[]): Promise<SaveResponseModel> {
        const saveAnalogScaleResponsesUrl = `${this.apiUrl}/values/grcs`;
        return this.http.post(saveAnalogScaleResponsesUrl, responses, this.options).toPromise()
            .then(response => {
                const result = response.json() as SaveResponseModel;
                this.loggerService.log(`saveAnalogScaleResponses() - saved to server: ${result.status}`);
                return result;
            },
            error => {
                this.loggerService.log(`saveAnalogScaleResponses() - error returned from server: ${error}`);
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
        return resultMap;
    }

    getDefaults() {
        return getDefaults();
    }
}

