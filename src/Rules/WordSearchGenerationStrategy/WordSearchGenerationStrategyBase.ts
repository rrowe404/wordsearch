import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { WordDirection } from 'src/Rules/WordDirection/WordDirection';
import { RandomNumberGeneratorService } from 'src/Rules/RandomNumberGenerator/RandomNumberGeneratorService';
import { WordPlacementStrategyFactory } from 'src/Rules/WordPlacementStrategy/WordPlacementStrategyFactory';
import { Injectable } from '@angular/core';
import { WordOrientation } from 'src/Rules/WordOrientation/WordOrientation';
import { WordSearchGenerationStrategyModule } from './WordSearchGenerationStrategyModule';
import { WordValidationService } from 'src/Rules/WordValidation/WordValidationService';
import { WordSearchState } from '../WordSearchState/WordSearchState';

@Injectable({
    providedIn: WordSearchGenerationStrategyModule
})
export abstract class WordSearchGenerationStrategyBase {
    protected directions: WordDirection[];
    protected orientations: WordOrientation[] = [WordOrientation.Forwards];
    protected allowOverlaps: boolean = false;

    constructor(
        private randomNumberGeneratorService: RandomNumberGeneratorService,
        private wordPlacementStrategyFactory: WordPlacementStrategyFactory,
        private wordValidationService: WordValidationService
    ) {
    }

    generate(currentState: WordSearchState) {
        currentState.words.forEach(word => {
            let place = this.checkWord(currentState, word);
            
            if (place) {
                this.placeWord(currentState, word)
            } else {
                this.handleRejectedWord(currentState, word);
            }
        });

        return currentState;
    }

    /**
     * @returns true if the word can be placed, false if not
     */
    private checkWord(currentState: WordSearchState, word: string) {
        return this.wordValidationService.validateWord(currentState, word);
    }

    private getRandomValueFrom<T>(array: T[]): T {
        return array[this.randomNumberGeneratorService.generateRandomIntWithMax(array.length)]
    }

    private handleRejectedWord(currentState: WordSearchState, word: string) {
        let errors = this.wordValidationService.getErrors(currentState, word);

        for (let error in errors) {
            console.log(errors[error]);
        }

        currentState.rejectWord(word);
    }

    private placeWord(currentState: WordSearchState, word: string) {
        let direction = this.getRandomValueFrom(this.directions);
        let wordPlacementStrategy = this.wordPlacementStrategyFactory.createStrategy(direction);

        if (this.allowOverlaps) {
            wordPlacementStrategy.enableOverlaps();
        }

        let orientation = this.getRandomValueFrom(this.orientations);

        if (orientation === WordOrientation.Backwards) {
            word = this.reverseWord(word);
        }

        wordPlacementStrategy.placeWord(currentState, word);
        currentState.acceptWord(word);
    }

    private reverseWord(word: string) {
        return word.split('').reverse().join('');
    }
}