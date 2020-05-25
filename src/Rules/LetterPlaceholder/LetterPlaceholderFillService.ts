import { LetterPlaceholder } from './LetterPlaceholder';
import { Injectable } from '@angular/core';
import { RandomNumberGeneratorService } from 'src/Rules/RandomNumberGenerator/RandomNumberGeneratorService';
import { LetterPlaceholderModule } from './LetterPlaceholderModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';

@Injectable({
    providedIn: LetterPlaceholderModule
})
export class LetterPlaceholderFillService {
    private alphabet = [
        'a','b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
        'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
        'w', 'x', 'y', 'z'
    ];

    constructor(
        private randomNumberGeneratorService: RandomNumberGeneratorService
    ) {}

    public fill(currentState: WordSearchState) {
        let filledPositions: Array<{ row: number, column: number}> = [];

        currentState.iterate((letter, row, column) => {
            if (letter === LetterPlaceholder.value) {
                let fillLetter = this.alphabet[this.randomNumberGeneratorService.generateRandomIntWithMax(this.alphabet.length)];
                currentState.setValueAt(row, column, fillLetter);
            } else {
                filledPositions.push({ row, column });
            }
        });

        this.filterProfanity(currentState, filledPositions);

        return currentState;
    }

    
    private filterProfanity(currentState: WordSearchState, filledPositions: Array<{ row: number, column: number}>) {
        // first create an array with all the letters and positions from the actual matrix
        let arr: Array<LetterWithPosition> = [];
        
        currentState.iterate((letter, row, column) => {
            arr.push({ letter, row, column });
        });
        
        let horizontalSlice = this.createHorizontalSlice(currentState, arr);
        let verticalSlice = this.createVerticalSlice(currentState, arr);
        let diagonalSlice = this.createDiagonalSlice(currentState, arr);
        let otherDiagonalSlice = this.createBottomLeftDiagonalSlice(currentState, arr);

        console.log('oink');
    }
    
    // the simplest one, just get an array for each row as-is
    private createHorizontalSlice(currentState: WordSearchState, lettersWithPositions: Array<LetterWithPosition>) {
        let slice = [];

        for (let i = 0; i < currentState.rows; i++) {
            slice.push(lettersWithPositions.filter(lwp => lwp.row === i));
        }

        return slice;
    }

    // also pretty simple, get an array for each column as-is
    private createVerticalSlice(currentState: WordSearchState, lettersWithPositions: Array<LetterWithPosition>) {
        let slice = [];

        for (let i = 0; i < currentState.columns; i++) {
            slice.push(lettersWithPositions.filter(lwp => lwp.column === i));
        }

        return slice;
    }

    // the most complex.
    // [q, m, c]
    // [j, n, b]
    // [p, i, g]
    // should become
    // [q]
    // [j, m],
    // [p, n, c],
    // [i, b],
    // [g]
    private createDiagonalSlice(currentState: WordSearchState, lettersWithPositions: Array<LetterWithPosition>) {
        // totally stolen from https://stackoverflow.com/questions/35917734/how-do-i-traverse-an-array-diagonally-in-javascript
        // what, you thought I wanted to think about this?? :D :D :D
        let slice = [];

        let yLength = currentState.rows;
        let xLength = currentState.columns;
        let maxLength = Math.max(yLength, xLength);
        
        let temp;
        

        for (let i = 0; i <= 2 * (maxLength - 1); ++i) {
            temp = [];

            for (let y = yLength - 1; y >= 0; --y) {
                let x = i - y;

                if (x >= 0 && x < xLength) {
                    temp.push(lettersWithPositions.filter(lwp => lwp.row === y && lwp.column === x)[0]);
                }
            }

            if (temp.length) {
                slice.push(temp);
                
            }
        }

        return slice;
    }

    // this had to be modified further from the other implementation on stackOverflow because
    // the given answer skipped the last letter. will recombine after writing tests.
    private createBottomLeftDiagonalSlice(currentState: WordSearchState, lettersWithPositions: Array<LetterWithPosition>) {
        let slice = [];

        let yLength = currentState.rows;
        let xLength = currentState.columns;
        let maxLength = Math.max(yLength, xLength);
        
        let temp;

        for (let i = 0; i <= 2 * maxLength; ++i) {
            temp = [];

            for (let y = yLength - 1; y >= 0; --y) {
                // this is the different line...
                let x = i - (yLength - y);

                if (x >= 0 && x < xLength) {
                    temp.push(lettersWithPositions.filter(lwp => lwp.row === y && lwp.column === x)[0]);
                }
            }

            if (temp.length) {
                slice.push(temp);
            }
        }

        return slice;
    }

}

interface LetterWithPosition {
    letter: string;
    row: number;
    column: number;
}