import { WordSearchState } from './WordSearchState';
import { Injectable } from '@angular/core';
import { WordSearchStateModule } from './WordSearchStateModule';

@Injectable({
    providedIn: WordSearchStateModule
})
export class WordSearchStateFactory {
    public createWordSearch() {
        return new WordSearchState();
    }
}