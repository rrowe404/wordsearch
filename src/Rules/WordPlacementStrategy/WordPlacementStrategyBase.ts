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

        if (startPosition) {
            let length = letters.length;

            // place the letters into position
            for (let i = 0; i < length; i++) {
                let nextPosition = this.getNextPosition(startPosition, i);
                currentState.setValueAt(nextPosition.row, nextPosition.column, letters[i]);
            }

            currentState.acceptWord(logWord);
        } else {
            currentState.rejectWord(logWord);
        }

        return currentState;
    }
}
