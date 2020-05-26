import { LetterPlaceholder } from './LetterPlaceholder';
import { Injectable } from '@angular/core';
import { RandomNumberGeneratorService } from 'src/Rules/RandomNumberGenerator/RandomNumberGeneratorService';
import { LetterPlaceholderModule } from './LetterPlaceholderModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { LetterWithPosition } from '../LetterWithPosition/LetterWithPosition';
import { HorizontalWordSearchStateSlicer } from '../WordSearchStateSlicer/HorizontalWordSearchStateSlicer';
import { VerticalWordSearchStateSlicer } from '../WordSearchStateSlicer/VerticalWordSearchStateSlicer';
import { TopLeftToBottomRightDiagonalWordSearchStateSlicer } from '../WordSearchStateSlicer/TopLeftToBottomRightDiagonalWordSearchStateSlicer';

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
        private horizontalStateSlicer: HorizontalWordSearchStateSlicer,
        private verticalSlicer: VerticalWordSearchStateSlicer,
        private topLeftToBottomRightSlicer: TopLeftToBottomRightDiagonalWordSearchStateSlicer,
        private randomNumberGeneratorService: RandomNumberGeneratorService
    ) {}

    public fill(currentState: WordSearchState) {
        currentState.iterate((letter, row, column) => {
            if (letter === LetterPlaceholder.value) {
                let fillLetter = this.alphabet[this.randomNumberGeneratorService.generateRandomIntWithMax(this.alphabet.length)];
                currentState.setValueAt(row, column, fillLetter);
            } 
        });

        this.filterProfanity(currentState);

        return currentState;
    }

    
    private filterProfanity(currentState: WordSearchState) {
        let arr = currentState.getLettersWithPositions();
        
        let horizontalSlice = this.horizontalStateSlicer.createSlice(currentState, arr);
        let verticalSlice = this.verticalSlicer.createSlice(currentState, arr);
        let diagonalSlice = this.topLeftToBottomRightSlicer.createSlice(currentState, arr);
        let otherDiagonalSlice = this.createBottomLeftDiagonalSlice(currentState, arr);

        console.log('oink');
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
