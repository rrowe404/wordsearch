import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { WordSearchDifficulty } from 'src/Rules/WordSearchDifficulty/WordSearchDifficulty';
import { WordSearchGenerationStrategyFactory } from 'src/Rules/WordSearchGenerationStrategy/WordSearchGenerationStrategyFactory';
import { LetterPlaceholderFillService } from 'src/Rules/LetterPlaceholder/LetterPlaceholderFillService';
import { Injectable } from '@angular/core';
import { WordSearchGenerationModule } from './WordSearchGenerationModule';
import { WordSearchStateFactory } from '../WordSearchState/WordSearchStateFactory';

@Injectable({
    providedIn: WordSearchGenerationModule
})
export class WordSearchGenerationService {
    constructor(
        private letterPlaceholderFillService: LetterPlaceholderFillService,
        private wordSearchGenerationStrategyFactory: WordSearchGenerationStrategyFactory,
        private wordSearchStateFactory: WordSearchStateFactory
    ) {
    }

    public generateWordSearch(options: WordSearchGenerationOptions, difficulty: WordSearchDifficulty) {
        let strategy = this.wordSearchGenerationStrategyFactory.createStrategy(difficulty);

        let wordSearch = this.wordSearchStateFactory.createWordSearch(options);

        strategy.generate(wordSearch);

        this.letterPlaceholderFillService.fill(wordSearch);

        return wordSearch;
    }
}