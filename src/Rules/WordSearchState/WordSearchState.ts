import { WordSearchGenerationOptions } from '../WordSearchGenerationOptions/WordSearchGenerationOptions';

export class WordSearchState {
    private matrix: string[][];
    private options: WordSearchGenerationOptions;

    public get columns() {
        return this.options.width;
    }

    public get rows() {
        return this.options.height;
    }

    public get words() {
        return this.options.words;
    }

    // debugger only
    public print() {
        this.matrix.forEach(row => console.log(row));
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
}