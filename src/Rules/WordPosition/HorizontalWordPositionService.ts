import { Injectable } from '@angular/core';
import { WordPositionModule } from './WordPositionModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordPosition } from './WordPosition';
import { LetterPlaceholder } from '../LetterPlaceholder/LetterPlaceholder';

@Injectable({
    providedIn: WordPositionModule
})
export class HorizontalWordPositionService {
    public getValidPositions(currentState: WordSearchState, word: string): WordPosition[] {
        let result = [];

        currentState.iterate((letter, row, column) => {
            let startPosition = { row, column };

            if (this.isValid(currentState, startPosition, word)) {
                result.push(startPosition);
            }
        });

        return result;
    }

    // always the same
    public getNextRow(startRow: number) {
        return startRow;
    }

    // hop over one column at a time
    public getNextColumn(startColumn: number, index: number) {
        return startColumn + index;
    }

    private isValid(currentState: WordSearchState, startPosition: WordPosition, word: string) {
        let letters = word.split('');

        return letters.every((letter, i) => {
            let nextPosition = {
                row: this.getNextRow(startPosition.row),
                column: this.getNextColumn(startPosition.column, i)
            };

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
