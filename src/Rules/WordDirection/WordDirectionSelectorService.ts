import { Injectable } from '@angular/core';
import { WordDirectionModule } from './WordDirectionModule';
import { WordDirectionCheckerFactory } from './WordDirectionCheckerFactory';
import { RandomNumberGeneratorService } from '../RandomNumberGenerator/RandomNumberGeneratorService';
import { WordSearchState } from '../WordSearchState/WordSearchState';

@Injectable({
    providedIn: WordDirectionModule
})
export class WordDirectionSelectorService {
    constructor(
        private randomNumberGeneratorService: RandomNumberGeneratorService,
        private wordDirectionCheckerFactory: WordDirectionCheckerFactory,
    ) {
    }

    /**
     * We'll try to randomly select a direction.
     * If that doesn't work, we'll randomly select another one.
     * If none of them work, there's a big problem.
     */
    public selectDirection(currentState: WordSearchState, word: string) {
        let attemptedDirections = [];
        let directions = currentState.directions;

        do {
            let directionsLeftToAttempt = directions.filter(direction => !attemptedDirections.includes(direction));
            let directionToAttempt = this.randomNumberGeneratorService.getRandomValueFrom(directionsLeftToAttempt);
            let directionChecker = this.wordDirectionCheckerFactory.getDirectionChecker(directionToAttempt);

            if (directionChecker.checkDirection(currentState, word)) {
                return directionToAttempt;
            }

            attemptedDirections.push(directionToAttempt);
        } while (attemptedDirections.length < directions.length);

        throw new Error('You fucked up!');
    }
}
