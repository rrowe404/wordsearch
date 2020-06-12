import { Injectable } from '@angular/core';
import { WordDirectionModule } from './WordDirectionModule';
import { WordDirectionCheckerFactory } from './WordDirectionCheckerFactory';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordDirection } from './WordDirection';

@Injectable({
    providedIn: WordDirectionModule
})
export class WordDirectionSelectorService {
    constructor(
        private wordDirectionCheckerFactory: WordDirectionCheckerFactory
    ) {
    }

    /**
     * Get the directions that the current word can fit in
     */
    public selectDirections(currentState: WordSearchState, word: string): WordDirection[] {
        return currentState.directions.filter(direction => {
            let checker = this.wordDirectionCheckerFactory.getDirectionChecker(direction);

            return checker.checkDirection(currentState, word);
        });
    }
}
