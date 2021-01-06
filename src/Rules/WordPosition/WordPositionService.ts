import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordPosition } from './WordPosition';
import { LetterPlaceholder } from '../LetterPlaceholder/LetterPlaceholder';
import { WordPositionValidationResult } from './WordPositionValidationResult';

export class WordPositionService {
    public getValidStartPositions(
        currentState: WordSearchState,
        getNextPosition: (startPosition: WordPosition, index: number) => WordPosition,
        isOutOfBounds: (startPosition: WordPosition) => boolean,
        word: string
    ): WordPosition[] {
        let result = [];

        currentState.iterate((letter, row, column) => {
            let startPosition: WordPosition = { row, column };

            if (!isOutOfBounds(startPosition)) {
                let validationResult = this.validate(currentState, startPosition, getNextPosition, word);

                if (this.isValid(validationResult)) {
                    if (validationResult === WordPositionValidationResult.Overlap) {
                        startPosition.hasOverlaps = true;
                    }

                    result.push(startPosition);
                }
            }
        });

        return result;
    }

    private validate(
        currentState: WordSearchState,
        startPosition: WordPosition,
        getNextPosition: (startPosition: WordPosition, index: number) => WordPosition,
        word: string
    ) {
        let letters = word.split('');
        let overlap = false;

        let valid = letters.every((letter, i) => {
            let nextPosition = getNextPosition(startPosition, i);

            let valueAtPosition = currentState.getValueAt(nextPosition.row, nextPosition.column);

            if (this.canPlaceLetterWithOverlaps(currentState, letter, valueAtPosition)) {
                overlap = true;
                return true;
            }

            return this.canPlaceLetterWithoutOverlaps(valueAtPosition);
        });

        if (valid) {
            return overlap ? WordPositionValidationResult.Overlap : WordPositionValidationResult.Clean;
        }

        return WordPositionValidationResult.Invalid;
    }

    private isValid(validationResult: WordPositionValidationResult) {
        return [WordPositionValidationResult.Clean, WordPositionValidationResult.Overlap].indexOf(validationResult) > -1;
    }

    private canPlaceLetterWithOverlaps(currentState: WordSearchState, letter: string, valueAtPosition: string) {
        return currentState.enableOverlaps && letter === valueAtPosition;
    }

    private canPlaceLetterWithoutOverlaps(valueAtPosition: string) {
        return valueAtPosition === LetterPlaceholder.value;
    }
}
