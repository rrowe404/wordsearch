import { WordSearchStateSlicer } from './WordSearchStateSlicer';
import { Injectable } from '@angular/core';
import { WordSearchStateSlicerModule } from './WordSearchStateSlicerModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { LetterWithPosition } from '../LetterWithPosition/LetterWithPosition';

/** also pretty simple, get an array for each column as-is*/
@Injectable({
    providedIn: WordSearchStateSlicerModule
})
export class VerticalWordSearchStateSlicer implements WordSearchStateSlicer {
    createSlice(currentState: WordSearchState, lettersWithPositions: LetterWithPosition[]): LetterWithPosition[][] {
        let slice = [];

        for (let i = 0; i < currentState.columns; i++) {
            slice.push(lettersWithPositions.filter(lwp => lwp.column === i));
        }

        return slice;
    }
}
