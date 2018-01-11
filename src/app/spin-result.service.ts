import { Injectable } from '@angular/core';
import { spinResult } from './test-result-map';
import { getDefaults } from './test-result-map';
import { getSymbolMap } from './test-result-map';

@Injectable()
export class SpinResultService {

    getSymbolMap() {
        return getSymbolMap();
   }

   getSpinResult() {
        return spinResult();
   }

   getDefaults() {
       return getDefaults();
   }
}

