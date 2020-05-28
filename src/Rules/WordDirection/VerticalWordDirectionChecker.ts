import { WordDirectionChecker } from './WordDirectionChecker';
import { Injectable } from '@angular/core';
import { WordDirectionModule } from './WordDirectionModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';

@Injectable({
    providedIn: WordDirectionModule
})
export class VerticalWordDirectionChecker implements WordDirectionChecker {
    checkDirection(currentState: WordSearchState, word: string) {
        return word.length <= currentState.rows;
    }
}
