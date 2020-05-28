import { WordSearchGenerationOptions } from '../WordSearchGenerationOptions/WordSearchGenerationOptions';
import { LetterWithPosition } from '../LetterWithPosition/LetterWithPosition';
import { WordDirection } from '../WordDirection/WordDirection';
import { WordOrientation } from '../WordOrientation/WordOrientation';

export class WordSearchState {
    private matrix: string[][];
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

    private get totalMessage() {
        return `Placed ${this.acceptedWords.length} of ${this.options.words.length}`;
    }

    // debugger only
    public print() {
        console.log(this.title);
        this.matrix.forEach(row => console.log(row));
        console.log(this.totalMessage);

        if (this.showWordList) {
            if (this.alphabetizeWordList) {
                this.acceptedWords = this.acceptedWords.sort();
            }

            this.acceptedWords.forEach(word => console.log(word));
        }
    }

    public getValueAt(row: number, column: number) {
        return this.matrix[row][column];
    }

    public setValueAt(row: number, column: number, value: string) {
        this.matrix[row][column] = value;
    }

    public seedMatrix(matrix: string[][]) {
        this.matrix = matrix;
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
        this.matrix.forEach((row, i) => {
            row.forEach((value, j) => {
                fn(value, i, j);
            })
        })
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