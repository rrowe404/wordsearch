import { WordSearchState } from './WordSearchState';
import { Injectable } from '@angular/core';
import { WordSearchStateModule } from './WordSearchStateModule';
import { ArrayGenerationService } from '../ArrayGeneration/ArrayGenerationService';
import { WordSearchGenerationOptions } from '../WordSearchGenerationOptions/WordSearchGenerationOptions';

@Injectable({
    providedIn: WordSearchStateModule
})
export class WordSearchStateFactory {
    constructor(
        private arrayGenerationService: ArrayGenerationService
    ) {}

    public createWordSearch(options: WordSearchGenerationOptions) {
        let state = new WordSearchState();
        state.setOptions(options);
        state.seedMatrix(this.arrayGenerationService.generateEmpty2dArray(state.columns, state.rows));

        return state;
    }

    public createWordSearchCopy(state: WordSearchState) {
        let result = new WordSearchState();
        result.setOptions(state.options);
        result.seedMatrix(state.matrix);

        return result;
    }
}
