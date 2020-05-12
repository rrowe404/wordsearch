import { WordSearchGenerationStrategy } from './WordSearchGenerationStrategy';
import { WordSearchGenerationOptions } from 'src/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { ArrayGenerationService } from 'src/ArrayGeneration/ArrayGenerationService';
import { RandomNumberGeneratorService } from 'src/RandomNumberGenerator/RandomNumberGeneratorService';
import { WordDirection } from 'src/WordDirection/WordDirection';
import { WordPlacementStrategyFactory } from 'src/WordPlacementStrategy/WordPlacementStrategyFactory';
import { Injectable } from '@angular/core';

/**
 * Forward words only, across and down only. No overlaps.
 */
@Injectable({
    providedIn: 'root'
})
export class EasyWordSearchGenerationStrategy implements WordSearchGenerationStrategy {
    private directions = [WordDirection.Horizontal, WordDirection.Vertical];

    constructor(
        private arrayGenerationService: ArrayGenerationService,
        private randomNumberGeneratorService: RandomNumberGeneratorService,
        private wordPlacementStrategyFactory: WordPlacementStrategyFactory
    ) {
    }

    generate(options: WordSearchGenerationOptions): string[][] {
        let columns = options.width;
        let rows = options.height;
        
        let array = this.arrayGenerationService.generateEmpty2dArray(columns, rows);
        
        options.words.forEach(word => {
            let direction = this.directions[this.randomNumberGeneratorService.generateRandomIntInRange(this.directions.length)];
            let wordPlacementStrategy = this.wordPlacementStrategyFactory.createStrategy(direction);
            wordPlacementStrategy.placeWord(array, word);
        });

        return array;
    }
}