import { WordSearchGenerationOptions } from 'src/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { WordDirection } from 'src/WordDirection/WordDirection';
import { ArrayGenerationService } from 'src/ArrayGeneration/ArrayGenerationService';
import { RandomNumberGeneratorService } from 'src/RandomNumberGenerator/RandomNumberGeneratorService';
import { WordPlacementStrategyFactory } from 'src/WordPlacementStrategy/WordPlacementStrategyFactory';
import { Injectable } from '@angular/core';
import { WordOrientation } from 'src/WordOrientation/WordOrientation';

@Injectable({
    providedIn: 'root'
})
export abstract class WordSearchGenerationStrategyBase {
    protected directions: WordDirection[];
    protected orientations: WordOrientation[] = [WordOrientation.Forwards];

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
            let direction = this.directions[this.randomNumberGeneratorService.generateRandomIntWithMax(this.directions.length)];
            let wordPlacementStrategy = this.wordPlacementStrategyFactory.createStrategy(direction);

            let orientation = this.orientations[this.randomNumberGeneratorService.generateRandomIntWithMax(this.orientations.length)];

            if (orientation === WordOrientation.Backwards) {
                word = this.reverseWord(word);
            }

            wordPlacementStrategy.placeWord(array, word);
        });

        return array;
    }

    private reverseWord(word: string) {
        return word.split('').reverse().join('');
    }
}