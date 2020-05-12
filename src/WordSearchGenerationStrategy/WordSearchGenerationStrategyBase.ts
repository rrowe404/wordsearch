import { WordSearchGenerationOptions } from 'src/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { WordDirection } from 'src/WordDirection/WordDirection';
import { ArrayGenerationService } from 'src/ArrayGeneration/ArrayGenerationService';
import { RandomNumberGeneratorService } from 'src/RandomNumberGenerator/RandomNumberGeneratorService';
import { WordPlacementStrategyFactory } from 'src/WordPlacementStrategy/WordPlacementStrategyFactory';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export abstract class WordSearchGenerationStrategyBase {
    protected directions: WordDirection[];

    constructor(
        private arrayGenerationService: ArrayGenerationService,
        private randomNumberGeneratorService: RandomNumberGeneratorService,
        private wordPlacementStrategyFactory: WordPlacementStrategyFactory
    ) {
    }

    generate(options: WordSearchGenerationOptions) {
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