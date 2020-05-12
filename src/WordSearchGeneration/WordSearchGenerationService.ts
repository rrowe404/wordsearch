import { WordSearchGenerationOptions } from 'src/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { WordSearchDifficulty } from 'src/WordSearchDifficulty/WordSearchDifficulty';
import { Injectable } from '@angular/core';
import { WordSearchGenerationStrategyFactory } from 'src/WordSearchGenerationStrategy/WordSearchGenerationStrategyFactory';
import { LetterPlaceholderFillService } from 'src/LetterPlaceholder/LetterPlaceholderFillService';

@Injectable({
    providedIn: 'root'
})
export class WordSearchGenerationService {
    constructor(
        private letterPlaceholderFillService: LetterPlaceholderFillService,
        private wordSearchGenerationStrategyFactory: WordSearchGenerationStrategyFactory
    ) {
    }

    public generateWordSearch(options: WordSearchGenerationOptions, difficulty: WordSearchDifficulty) {
        let strategy = this.wordSearchGenerationStrategyFactory.createStrategy(difficulty);
        let result = strategy.generate(options);

        result = this.letterPlaceholderFillService.fill(result);

        return result;
    }
}