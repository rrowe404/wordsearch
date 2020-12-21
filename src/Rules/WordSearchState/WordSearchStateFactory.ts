import { WordSearchState } from './WordSearchState';
import { ArrayGenerationService } from '../ArrayGeneration/ArrayGenerationService';
import { WordSearchGenerationOptions } from '../WordSearchGenerationOptions/WordSearchGenerationOptions';

export class WordSearchStateFactory {
    private arrayGenerationService = new ArrayGenerationService();

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
        result.acceptedWordOverride(state.wordList);

        return result;
    }
}
