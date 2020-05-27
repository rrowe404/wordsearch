import { Injectable } from '@angular/core';
import { ProfanityFilterModule } from './ProfanityFilterModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { LetterWithPosition } from '../LetterWithPosition/LetterWithPosition';
import { HorizontalWordSearchStateSlicer } from '../WordSearchStateSlicer/HorizontalWordSearchStateSlicer';
import { VerticalWordSearchStateSlicer } from '../WordSearchStateSlicer/VerticalWordSearchStateSlicer';
import { TopLeftToBottomRightDiagonalWordSearchStateSlicer } from '../WordSearchStateSlicer/TopLeftToBottomRightDiagonalWordSearchStateSlicer';
import { BottomLeftToTopRightDiagonalWordSearchStateSlicer } from '../WordSearchStateSlicer/BottomLeftToTopRightDiagonalWordSearchStateSlicer';
import { LetterPlaceholder } from '../LetterPlaceholder/LetterPlaceholder';

@Injectable({
    providedIn: ProfanityFilterModule
})
export class ProfanityFilterService {
    constructor(
        private horizontalStateSlicer: HorizontalWordSearchStateSlicer,
        private verticalSlicer: VerticalWordSearchStateSlicer,
        private topLeftToBottomRightSlicer: TopLeftToBottomRightDiagonalWordSearchStateSlicer,
        private bottomLeftToTopRightSlicer: BottomLeftToTopRightDiagonalWordSearchStateSlicer,
    ) {

    }

    private profanity: string[];

    public setProfanityList(list: string[]) {
        this.profanity = list;
    }

    /**
     * This removes the letters belonging to profane words but does NOT fill them back in. Do that in LetterPlaceholderFillService!
     * @returns whether or not anything was replaced
     */
    public filterProfanity(currentState: WordSearchState, userPlacedLetters: LetterWithPosition[]) {
        let arr = currentState.getLettersWithPositions();
        
        let horizontalSlice = this.horizontalStateSlicer.createSlice(currentState, arr);
        let verticalSlice = this.verticalSlicer.createSlice(currentState, arr);
        let diagonalSlice = this.topLeftToBottomRightSlicer.createSlice(currentState, arr);
        let otherDiagonalSlice = this.bottomLeftToTopRightSlicer.createSlice(currentState, arr);

        let slices = [
            horizontalSlice,
            verticalSlice,
            diagonalSlice,
            otherDiagonalSlice
        ];

        let didAnything = false;

        slices.forEach(slice => {
            slice.forEach(subslice => {
                let didAnythingForSubslice = this.replaceProfanityInSubSlice(currentState, subslice, userPlacedLetters);

                if (didAnythingForSubslice) {
                    didAnything = true;
                }
            });
        });

        return didAnything;
    }

    private replaceProfanityInSubSlice(currentState: WordSearchState, subslice: LetterWithPosition[], userPlacedLetters: LetterWithPosition[]) {
        let str = subslice.map(x => x.letter).join('');
        let didAnything = false;

        let replace = () => this.profanity.forEach(curse => {
            let index = str.indexOf(curse);

            if (index === -1) {
                return;
            } else {
                let letters = subslice.slice(index, curse.length);

                letters.forEach(lwp => {
                    if (!userPlacedLetters.filter(upl => lwp.column === upl.column && lwp.row === upl.row).length) {
                        currentState.setValueAt(lwp.row, lwp.column, LetterPlaceholder.value);
                        didAnything = true;
                    }
                });
            }
        });

        replace();
        str = subslice.reverse().map(x => x.letter).join('');
        replace();

        return didAnything;
    }
}