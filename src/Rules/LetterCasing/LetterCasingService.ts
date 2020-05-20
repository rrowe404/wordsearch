import { Injectable } from '@angular/core';
import { LetterCasingModule } from './LetterCasingModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';

@Injectable({
    providedIn: LetterCasingModule
})
export class LetterCasingService {
    case(currentState: WordSearchState) {
        currentState.iterate((letter, row, column)  => {
            currentState.setValueAt(row, column, letter.toUpperCase());
        });
    }
}