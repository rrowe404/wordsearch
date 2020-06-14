import { Injectable, EventEmitter } from '@angular/core';
import { PlayableEventModule } from './PlayableEventModule';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';

@Injectable({
    providedIn: PlayableEventModule
})
export class PlayableEventService {
    /** Tells the app to load up the component to allow the user to play the generated word search */
    public activate: EventEmitter<WordSearchState> = new EventEmitter();

    /** Tells the app to destroy the component that allows the user to play the generated word search */
    public deactivate: EventEmitter<void> = new EventEmitter();
}
