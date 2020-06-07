import { Injectable } from '@angular/core';
import { WordPositionModule } from './WordPositionModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordPosition } from './WordPosition';
import { LetterPlaceholder } from '../LetterPlaceholder/LetterPlaceholder';

@Injectable({
    providedIn: WordPositionModule
})
export class WordPositionService {
    public getValidPositions(
        currentState: WordSearchState,
        getNextPosition: (startPosition: WordPosition, index: number) => WordPosition,
        word: string
    ): WordPosition[] {
        let result = [];

        currentState.iterate((letter, row, column) => {
            let startPosition = { row, column };

            if (this.isValid(currentState, startPosition, getNextPosition, word)) {
                result.push(startPosition);
            }
        });

        return result;
    }

    private isValid(
        currentState: WordSearchState,
        startPosition: WordPosition,
        getNextPosition: (startPosition: WordPosition, index: number) => WordPosition,
        word: string
    ) {
        let letters = word.split('');

        return letters.every((letter, i) => {
            let nextPosition = getNextPosition(startPosition, i);

            let valueAtPosition = currentState.getValueAt(nextPosition.row, nextPosition.column);
            return this.canPlaceLetter(currentState, letter, valueAtPosition);
        });
    }

    private canPlaceLetter(currentState: WordSearchState, letter: string, valueAtPosition: string) {
        if (currentState.enableOverlaps && letter === valueAtPosition) {
            return true;
        }

        return valueAtPosition === LetterPlaceholder.value;
    }
}
