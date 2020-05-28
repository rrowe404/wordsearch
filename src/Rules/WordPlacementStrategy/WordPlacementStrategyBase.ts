import { LetterPlaceholder } from 'src/Rules/LetterPlaceholder/LetterPlaceholder';
import { WordSearchState } from '../WordSearchState/WordSearchState';

export abstract class WordPlacementStrategyBase {
    private mustOverrideMessage = 'This must be overriden!';

    /** Do override these */
    public getStartRow(currentState: WordSearchState, word: string): number {
        throw new Error(this.mustOverrideMessage);
    }

    public getStartColumn(currentState: WordSearchState, word: string): number {
        throw new Error(this.mustOverrideMessage);
    }

    public getNextRow(startRow: number, currentIndex: number): number {
        throw new Error(this.mustOverrideMessage);
    }

    public getNextColumn(startColumn: number, currentIndex: number): number {
        throw new Error(this.mustOverrideMessage);
    }
    /***/

    placeWord(
        currentState: WordSearchState,
        word: string,
    ) {
        let letters = word.split('');

        let startRow = this.getStartRow(currentState, word);
        let startColumn = this.getStartColumn(currentState, word);

        let positioned = false;
        let attempts = 0;
        let maxAttempts = 5;

        while (!positioned) {
            // check to see if there is enough room. loop until we've found a suitable starting point
            positioned = letters.every((letter, i) => {
                let valueAtPosition = currentState.getValueAt(this.getNextRow(startRow, i), this.getNextColumn(startColumn, i));
                return this.canPlaceLetter(currentState, letter, valueAtPosition);
            });

            if (positioned) {
                break;
            } else {
                startColumn = this.getStartColumn(currentState, word);
                startRow = this.getStartRow(currentState, word);
                attempts++;

                if (attempts > maxAttempts) {
                    console.log('you fucked up somehow. freeing you from infinite loop...');
                    currentState.rejectWord(word);
                    break;
                }
            }
        }

        if (positioned) {
            let length = letters.length;

            // place the letters into position
            for (let i = 0; i < length; i++) {
                currentState.setValueAt(this.getNextRow(startRow, i), this.getNextColumn(startColumn, i), letters[i]);
                currentState.acceptWord(word);
            }
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
