import { LetterPlaceholder } from 'src/Rules/LetterPlaceholder/LetterPlaceholder';
import { WordSearchState } from '../WordSearchState/WordSearchState';

export abstract class WordPlacementStrategyBase {
    private allowOverlaps: boolean = false;
    private mustOverrideMessage: string = 'This must be overriden!';

    /** Don't override this */
    public enableOverlaps() {
        this.allowOverlaps = true;
    }

    /** Do override these */
    public getStartRow(currentState: WordSearchState, word: string): number {
        throw new Error(this.mustOverrideMessage);
    }
    /***/

    placeWord(
        currentState: WordSearchState,
        word: string,
        getStartColumn: (rows) => number,
        getNextRow: (row: number, i: number) => number,
        getNextColumn: (column: number, i: number) => number
    ) {
        let letters = word.split('');

        let rows = currentState.rows;
        let columns = currentState.columns;

        let startRow = this.getStartRow(currentState, word);
        let startColumn = getStartColumn(columns);

        let positioned = false;
        let attempts = 0;
        let maxAttempts = 5;

        while (!positioned) {
            // check to see if there is enough room. loop until we've found a suitable starting point
            positioned = letters.every((letter, i) => {
                let valueAtPosition = currentState.getValueAt(getNextRow(startRow, i), getNextColumn(startColumn, i));
                return this.canPlaceLetter(letter, valueAtPosition);
            });

            if (positioned) {
                break;
            } else {
                startColumn = getStartColumn(columns);
                startRow = this.getStartRow(currentState, word);
                attempts++;

                if (attempts > maxAttempts) {
                    console.log('you fucked up somehow. freeing you from infinite loop...');
                    break;
                }
            }
        }

        if (positioned) {
            let length = letters.length;

            // place the letters into position
            for (let i = 0; i < length; i++) {
                currentState.setValueAt(getNextRow(startRow, i), getNextColumn(startColumn, i), letters[i]);
            }
        }

        return currentState;
    }

    private canPlaceLetter(letter, valueAtPosition) { 
        if (this.enableOverlaps && letter === valueAtPosition) {
            return true;
        }

        return valueAtPosition === LetterPlaceholder.value;
    }
}