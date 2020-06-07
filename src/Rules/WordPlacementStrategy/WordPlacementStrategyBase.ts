import { LetterPlaceholder } from 'src/Rules/LetterPlaceholder/LetterPlaceholder';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { RandomNumberGeneratorService } from '../RandomNumberGenerator/RandomNumberGeneratorService';
import { WordOrientation } from '../WordOrientation/WordOrientation';
import { StringUtils } from '../StringUtils/StringUtils';
import { Injectable } from '@angular/core';
import { WordPlacementStrategyModule } from './WordPlacementStrategyModule';
import { WordPosition } from '../WordPosition/WordPosition';

@Injectable({
    providedIn: WordPlacementStrategyModule
})
export abstract class WordPlacementStrategyBase {
    public abstract getStartPosition(currentState: WordSearchState, word: string): WordPosition;
    public abstract getNextPosition(startPosition: WordPosition, index: number): WordPosition;

    constructor(
        protected randomNumberGeneratorService: RandomNumberGeneratorService,
        protected stringUtils: StringUtils
    ) {
    }

    placeWord(
        currentState: WordSearchState,
        word: string,
    ) {
        // prevent reversed words from showing up reversed in word list
        let logWord = word;

        let orientation = this.randomNumberGeneratorService.getRandomValueFrom(currentState.orientations);

        if (orientation === WordOrientation.Backwards) {
            word = this.stringUtils.reverseWord(word);
        }

        let letters = word.split('');

        let startPosition = this.getStartPosition(currentState, word);

        let positioned = false;
        let attempts = 0;
        let maxAttempts = 5;

        while (!positioned) {
            // check to see if there is enough room. loop until we've found a suitable starting point
            positioned = letters.every((letter, i) => {
                let nextPosition = this.getNextPosition(startPosition, i);
                let valueAtPosition = currentState.getValueAt(nextPosition.row, nextPosition.column);

                return this.canPlaceLetter(currentState, letter, valueAtPosition);
            });

            if (positioned) {
                break;
            } else {
                startPosition = this.getStartPosition(currentState, word);
                attempts++;

                if (attempts > maxAttempts) {
                    console.log('you fucked up somehow. freeing you from infinite loop...');
                    currentState.rejectWord(logWord);
                    break;
                }
            }
        }

        if (positioned) {
            let length = letters.length;

            // place the letters into position
            for (let i = 0; i < length; i++) {
                let nextPosition = this.getNextPosition(startPosition, i);
                currentState.setValueAt(nextPosition.row, nextPosition.column, letters[i]);
            }

            currentState.acceptWord(logWord);
        }

        return currentState;
    }

    private canPlaceLetter(currentState: WordSearchState, letter: string, valueAtPosition: string) {
        if (currentState.enableOverlaps && letter === valueAtPosition) {
            return true;
        }

        return valueAtPosition === LetterPlaceholder.value;
    }
}
