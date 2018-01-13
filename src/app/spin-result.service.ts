import { Injectable } from '@angular/core';
import { spinResult } from './test-result-map';
import { getDefaults } from './test-result-map';
import { getSymbolNames } from './test-result-map';
import {RNG} from './rng';

@Injectable()
export class SpinResultService {

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

   getSpinResultAsync() {
        const resultMap = this.getSpinResult();

        return new Promise<number[][]>(resolve => {
            setTimeout(() => {
                resolve (resultMap);
            }, 1500);
        });

    }

   getDefaults() {
        return getDefaults();
   }
}

