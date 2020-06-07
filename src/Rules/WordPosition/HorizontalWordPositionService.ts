import { Injectable } from '@angular/core';
import { WordPositionModule } from './WordPositionModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordPosition } from './WordPosition';

@Injectable({
    providedIn: WordPositionModule
})
export class HorizontalWordPositionService {
    public getValidPositions(currentState: WordSearchState, word: string): WordPosition[] {
        return [];
    }
}
