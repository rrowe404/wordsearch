import { Injectable } from '@angular/core';
import { WordSearchOutputModule } from './WordSearchOutputModule';
import { WordSearchOutputStrategy } from './WordSearchOutputStrategy';
import { WordSearchState } from '../WordSearchState/WordSearchState';

/** Debug only. Should not be available in prod mode. */
@Injectable({
    providedIn: WordSearchOutputModule
})
export class ConsoleWordSearchOutputStrategy implements WordSearchOutputStrategy {
    output(currentState: WordSearchState) {
        console.log(currentState.title);
        currentState.matrix.forEach(row => console.log(row));
        console.log(currentState.totalMessage);
        currentState.wordList.forEach(word => console.log(word));
    }
}