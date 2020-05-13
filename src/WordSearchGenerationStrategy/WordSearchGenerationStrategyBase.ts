import { WordSearchGenerationOptions } from 'src/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { WordDirection } from 'src/WordDirection/WordDirection';
import { ArrayGenerationService } from 'src/ArrayGeneration/ArrayGenerationService';
import { RandomNumberGeneratorService } from 'src/RandomNumberGenerator/RandomNumberGeneratorService';
import { WordPlacementStrategyFactory } from 'src/WordPlacementStrategy/WordPlacementStrategyFactory';
import { Injectable } from '@angular/core';
import { WordOrientation } from 'src/WordOrientation/WordOrientation';
import { WordSearchGenerationStrategyModule } from './WordSearchGenerationStrategyModule';

@Injectable({
    providedIn: WordSearchGenerationStrategyModule
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

        options.words.forEach(word => {
            let place = this.checkWord(options, word);
            
            if (place) {
                this.placeWord(array, word)
            } else {
                this.handleRejectedWord(word);
            }
        });

        return array;
    }

    /**
     * @returns true if the word can be placed, false if not
     */
    private checkWord(options: WordSearchGenerationOptions, word: string) {
        let tooWide = () => word.length > options.width;
        let tooTall = () => word.length > options.height;

        if (tooWide() || tooTall()) {
            return false;
        }

        return true;
    }

    private getRandomValueFrom<T>(array: T[]): T {
        return array[this.randomNumberGeneratorService.generateRandomIntWithMax(array.length)]
    }

    private handleRejectedWord(word) {
        console.log(`Could not place '${word}!'`)
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