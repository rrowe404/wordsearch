import { WordSearchGenerationOptions } from '../WordSearchGenerationOptions/WordSearchGenerationOptions';

export class WordSearchState {
    private matrix: string[][];
    private options: WordSearchGenerationOptions;
    private acceptedWords: string[] = [];
    private rejectedWords: string[] = [];

    public get columns() {
        return this.options.width;
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
}