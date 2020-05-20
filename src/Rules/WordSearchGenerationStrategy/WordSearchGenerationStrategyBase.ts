import { WordDirection } from 'src/Rules/WordDirection/WordDirection';
import { RandomNumberGeneratorService } from 'src/Rules/RandomNumberGenerator/RandomNumberGeneratorService';
import { WordPlacementStrategyFactory } from 'src/Rules/WordPlacementStrategy/WordPlacementStrategyFactory';
import { Injectable } from '@angular/core';
import { WordOrientation } from 'src/Rules/WordOrientation/WordOrientation';
import { WordSearchGenerationStrategyModule } from './WordSearchGenerationStrategyModule';
import { WordValidationService } from 'src/Rules/WordValidation/WordValidationService';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordDirectionCheckerFactory } from '../WordDirection/WordDirectionCheckerFactory';
import { StringUtils } from '../StringUtils/StringUtils';

@Injectable({
    providedIn: WordSearchGenerationStrategyModule
})
export abstract class WordSearchGenerationStrategyBase {
    protected directions: WordDirection[];
    protected orientations: WordOrientation[] = [WordOrientation.Forwards];
    protected allowOverlaps: boolean = false;

    constructor(
        private randomNumberGeneratorService: RandomNumberGeneratorService,
        private stringUtils: StringUtils,
        private wordDirectionCheckerFactory: WordDirectionCheckerFactory,
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
        return Object.keys(this.wordValidationService.getErrors(currentState, word)).length === 0;
    }

    /**
     * We'll try to randomly select a direction.
     * If that doesn't work, we'll randomly select another one.
     * If none of them work, there's a big problem.
     */
    private chooseDirection(currentState: WordSearchState, word: string) {
        let attemptedDirections = [];
        
        do {
            let directionsLeftToAttempt = this.directions.filter(direction => !attemptedDirections.includes(direction));
            let directionToAttempt = this.randomNumberGeneratorService.getRandomValueFrom(directionsLeftToAttempt);
            let directionChecker = this.wordDirectionCheckerFactory.getDirectionChecker(directionToAttempt);

            if (directionChecker.checkDirection(currentState, word)) {
                return directionToAttempt;
            }

            attemptedDirections.push(directionToAttempt);
        } while (attemptedDirections.length < this.directions.length)

        throw new Error("You fucked up!");
    }

    private handleRejectedWord(currentState: WordSearchState, word: string) {
        let errors = this.wordValidationService.getErrors(currentState, word);

        for (let error in errors) {
            console.log(errors[error]);
        }

        currentState.rejectWord(word);
    }

    private placeWord(currentState: WordSearchState, word: string) {
        let direction = this.chooseDirection(currentState, word);;
        let wordPlacementStrategy = this.wordPlacementStrategyFactory.createStrategy(direction);

        if (this.allowOverlaps) {
            wordPlacementStrategy.enableOverlaps();
        }

        let orientation = this.randomNumberGeneratorService.getRandomValueFrom(this.orientations);

        if (orientation === WordOrientation.Backwards) {
            word = this.stringUtils.reverseWord(word);
        }

        wordPlacementStrategy.placeWord(currentState, word);
        currentState.acceptWord(word);
    }
}