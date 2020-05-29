import { WordSearchGenerationOptions } from '../WordSearchGenerationOptions/WordSearchGenerationOptions';
import { LetterWithPosition } from '../LetterWithPosition/LetterWithPosition';
import { WordDirection } from '../WordDirection/WordDirection';
import { WordOrientation } from '../WordOrientation/WordOrientation';
import { ObjectUtils } from '../ObjectUtils/ObjectUtils';

export class WordSearchState {
    private _matrix: string[][];
    private options: WordSearchGenerationOptions;
    private acceptedWords: string[] = [];
    private rejectedWords: string[] = [];

    public get columns() {
        return this.options.width;
    }

    public get directions(): WordDirection[] {
        let result = [];

        if (this.options.allowHorizontal) {
            result.push(WordDirection.Horizontal);
        }

        if (this.options.allowVertical) {
            result.push(WordDirection.Vertical);
        }

        if (this.options.allowDiagonal) {
            result.push(WordDirection.Diagonal);
        }

        return result;
    }

    /**
     * Returns a copy of the current puzzle
     */
    public get matrix() {
        return ObjectUtils.copy(this._matrix);
    }

    public get enableOverlaps() {
        return this.options.allowOverlaps;
    }

    public get orientations(): WordOrientation[] {
        let result = [WordOrientation.Forwards];

        if (this.options.allowBackwards) {
            result.push(WordOrientation.Backwards);
        }

        return result;
    }

    public get rows() {
        return this.options.height;
    }

    public get title() {
        return this.options.title;
    }

    public get words() {
        return this.options.words;
    }

    public get alphabetizeWordList() {
        return this.options.alphabetizeWordList;
    }

    public get filterAccidentalProfanity() {
        return this.options.filterAccidentalProfanity;
    }

    public get showWordList() {
        return this.options.showWordList;
    }

    public get totalMessage() {
        return `Placed ${this.acceptedWords.length} of ${this.options.words.length}`;
    }

    /**
     * Applies options and returns a copy of the current word list
     */
    public get wordList(): string[] {
        let result = [];

        if (this.showWordList) {
            if (this.alphabetizeWordList) {
                result = this.acceptedWords.sort();
            } else {
                result = this.acceptedWords;
            }
        }

        return ObjectUtils.copy(result);
    }

    public getValueAt(row: number, column: number) {
        return this._matrix[row][column];
    }

    public setValueAt(row: number, column: number, value: string) {
        this._matrix[row][column] = value;
    }

    public seedMatrix(matrix: string[][]) {
        this._matrix = matrix;
    }

    public setOptions(options: WordSearchGenerationOptions) {
        this.options = options;
    }

    public acceptWord(word: string) {
        this.acceptedWords.push(word);
    }

    public rejectWord(word: string) {
        this.rejectedWords.push(word);
    }

    /* Allows a function to run once for each position in the matrix */
    public iterate(fn: (letter: string, row: number, column: number) => void) {
        this._matrix.forEach((row, i) => {
            row.forEach((value, j) => {
                fn(value, i, j);
            });
        });
    }

    /** create an array with all the letters and positions from the actual matrix */
    public getLettersWithPositions(): Array<LetterWithPosition> {
        let result = [];

        this.iterate((letter, row, column) => {
            result.push({ letter, row, column });
        });

        return result;
    }
}
