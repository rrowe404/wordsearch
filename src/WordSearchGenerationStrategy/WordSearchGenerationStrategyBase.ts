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
    protected allowOverlaps: boolean = false;

    constructor(
        private arrayGenerationService: ArrayGenerationService,
        private randomNumberGeneratorService: RandomNumberGeneratorService,
        private wordPlacementStrategyFactory: WordPlacementStrategyFactory
    ) {
    }

    generate(options: WordSearchGenerationOptions) {
        let columns = options.width;
        let rows = options.height;

        let array: string[][] = this.arrayGenerationService.generateEmpty2dArray(columns, rows);

        options.words.forEach(word => this.placeWord(array, word));

        return array;
    }

    private getRandomValueFrom<T>(array: T[]): T {
        return array[this.randomNumberGeneratorService.generateRandomIntWithMax(array.length)]
    }

    private placeWord(array: string[][], word: string) {
        let direction = this.getRandomValueFrom(this.directions);
        let wordPlacementStrategy = this.wordPlacementStrategyFactory.createStrategy(direction);

        if (this.allowOverlaps) {
            wordPlacementStrategy.enableOverlaps();
        }

        let orientation = this.getRandomValueFrom(this.orientations);

        if (orientation === WordOrientation.Backwards) {
            word = this.reverseWord(word);
        }

        wordPlacementStrategy.placeWord(array, word);
    }

    private reverseWord(word: string) {
        return word.split('').reverse().join('');
    }
}