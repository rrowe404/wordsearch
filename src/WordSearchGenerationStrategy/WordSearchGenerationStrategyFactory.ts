import { WordSearchDifficulty } from 'src/WordSearchDifficulty/WordSearchDifficulty';
import { EasyWordSearchGenerationStrategy } from './EasyWordSearchGenerationStrategy';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WordSearchGenerationStrategyFactory {
    constructor(
        private easyWordSearchGenerationStrategy: EasyWordSearchGenerationStrategy,
    ) {
    }

    public createStrategy(difficulty: WordSearchDifficulty) {
        switch (difficulty) {
            case WordSearchDifficulty.Easy:
                return this.easyWordSearchGenerationStrategy;

            default:
                throw new Error("Not implemented!");
        }
    }
}