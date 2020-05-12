import { LetterPlaceholder } from 'src/LetterPlaceholder/LetterPlaceholder';

export abstract class WordPlacementStrategyBase {
    placeWord(
        currentState: string[][],
        word: string,
        getStartRow: (columns: number) => number,
        getStartColumn: (rows) => number,
        getNextRow: (row: number, i: number) => number,
        getNextColumn: (column: number, i: number) => number
    ) {
        let letters = word.split('');

        let rows = currentState[0].length;
        let columns = currentState.length;

        let startRow = getStartRow(rows);
        let startColumn = getStartColumn(columns);

        let positioned = false;
        let attempts = 0;
        let maxAttempts = 5;

        while (!positioned) {
            // check to see if there is enough room. loop until we've found a suitable starting point
            positioned = letters.every((letter, i) => {
                return currentState[getNextRow(startColumn, i)][getNextColumn(startRow, i)] === LetterPlaceholder.value;
            });

            if (positioned) {
                break;
            } else {
                startColumn = getStartColumn(columns);
                startRow = getStartRow(rows);
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
                currentState[getNextRow(startColumn, i)][getNextColumn(startRow, i)] = letters[i];
            }
        }

        return currentState;
    }
}