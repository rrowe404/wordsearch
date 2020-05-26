import { LetterPlaceholder } from './LetterPlaceholder';
import { Injectable } from '@angular/core';
import { RandomNumberGeneratorService } from 'src/Rules/RandomNumberGenerator/RandomNumberGeneratorService';
import { LetterPlaceholderModule } from './LetterPlaceholderModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { HorizontalWordSearchStateSlicer } from '../WordSearchStateSlicer/HorizontalWordSearchStateSlicer';
import { VerticalWordSearchStateSlicer } from '../WordSearchStateSlicer/VerticalWordSearchStateSlicer';
import { TopLeftToBottomRightDiagonalWordSearchStateSlicer } from '../WordSearchStateSlicer/TopLeftToBottomRightDiagonalWordSearchStateSlicer';
import { BottomLeftToTopRightDiagonalWordSearchStateSlicer } from '../WordSearchStateSlicer/BottomLeftToTopRightDiagonalWordSearchStateSlicer';

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
        private bottomLeftToTopRightSlicer: BottomLeftToTopRightDiagonalWordSearchStateSlicer,
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
        let otherDiagonalSlice = this.bottomLeftToTopRightSlicer.createSlice(currentState, arr);

        console.log('oink');
    }
}
