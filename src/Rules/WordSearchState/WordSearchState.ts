import { WordSearchGenerationOptions } from '../WordSearchGenerationOptions/WordSearchGenerationOptions';
import { LetterWithPosition } from '../LetterWithPosition/LetterWithPosition';
import { WordDirection } from '../WordDirection/WordDirection';
import { WordOrientation } from '../WordOrientation/WordOrientation';
import { ObjectUtils } from '../ObjectUtils/ObjectUtils';

export class WordSearchState {
    // tslint:disable-next-line
    private _matrix: string[][];
    // tslint:disable-next-line
    private _options: WordSearchGenerationOptions;
    private acceptedWords: string[] = [];
    private rejectedWords: string[] = [];

    public get columns() {
        return this._options.width;
    }

    public get directions(): WordDirection[] {
        let result = [];

        if (this._options.allowHorizontal) {
            result.push(WordDirection.Horizontal);
        }

        if (this._options.allowVertical) {
            result.push(WordDirection.Vertical);
        }

        if (this._options.allowDiagonal) {
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
        return this._options.allowOverlaps;
    }

    /**
     * Returns a copy of the current options
     */
    public get options() {
        return ObjectUtils.copy(this._options);
    }

    public get orientations(): WordOrientation[] {
        let result = [WordOrientation.Forwards];

        if (this._options.allowBackwards) {
            result.push(WordOrientation.Backwards);
        }

        return result;
    }

    public get rows() {
        return this._options.height;
    }

    public get title() {
        return this._options.title;
    }

    public get words() {
        return this._options.words;
    }

    public get alphabetizeWordList() {
        return this._options.alphabetizeWordList;
    }

    public get filterAccidentalProfanity() {
        return this._options.filterAccidentalProfanity;
    }

    public get outputOption() {
        return this._options.outputOption;
    }

    public get showWordList() {
        return this._options.showWordList;
    }

    public get totalMessage() {
        return `Placed ${this.acceptedWords.length} of ${this._options.words.length}`;
    }

    /**
     * Applies options and returns a copy of the current word list
     */
    public get wordList(): string[] {
        let result = [];

        if (this.alphabetizeWordList) {
            result = this.acceptedWords.sort();
        } else {
            result = this.acceptedWords;
        }

        return ObjectUtils.copy(result);
    }

    public get zealousOverlaps(): boolean {
        return this.enableOverlaps && this._options.zealousOverlaps;
    }

    public acceptedWordOverride(list: string[]) {
        this.acceptedWords = list;
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
        this._options = options;
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
