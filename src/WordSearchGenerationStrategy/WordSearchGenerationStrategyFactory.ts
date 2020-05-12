import { WordSearchDifficulty } from 'src/WordSearchDifficulty/WordSearchDifficulty';
import { EasyWordSearchGenerationStrategy } from './EasyWordSearchGenerationStrategy';
import { Injectable } from '@angular/core';
import { MediumWordSearchGenerationStrategy } from './MediumWordSearchGenerationStrategy';

@Injectable({
    providedIn: 'root'
})
export class WordSearchGenerationStrategyFactory {
    constructor(
        private easyWordSearchGenerationStrategy: EasyWordSearchGenerationStrategy,
        private mediumWordSearchGenerationStrategy: MediumWordSearchGenerationStrategy
    ) {
    }

    public createStrategy(difficulty: WordSearchDifficulty) {
        switch (difficulty) {
            case WordSearchDifficulty.Easy:
                return this.easyWordSearchGenerationStrategy;

            case WordSearchDifficulty.Medium:
                return this.mediumWordSearchGenerationStrategy;

            default:
                throw new Error("Not implemented!");
        }
    }
}