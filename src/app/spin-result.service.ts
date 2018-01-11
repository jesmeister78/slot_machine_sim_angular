import { Injectable } from '@angular/core';
import { spinResult } from './test-result-map';
import { getDefaults } from './test-result-map';
import { getSymbolNames } from './test-result-map';

@Injectable()
export class SpinResultService {

    getSymbolNames() {
        return getSymbolNames();
   }

   getSpinResult() {
        const resultMap = spinResult();
        return  resultMap;
   }

   getDefaults() {
        return getDefaults();
   }
}

