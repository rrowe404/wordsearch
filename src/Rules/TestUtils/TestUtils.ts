import { WordSearchGenerationOptions } from '../WordSearchGenerationOptions/WordSearchGenerationOptions';

/** This class should ONLY be referred to in .spec.ts files! */
export class TestUtils {
    public static createOptions(matrix: string[][]): WordSearchGenerationOptions {
        return {
            alphabetizeWordList: false,
            height: matrix.length,
            width: matrix[0].length,
            showWordList: false,
            title: '',
            words: [],
            filterAccidentalProfanity: false,
            allowVertical: true,
            allowBackwards: true,
            allowDiagonal: true,
            allowHorizontal: true,
            allowOverlaps: true,
            zealousOverlaps: false
        };
    }
}
