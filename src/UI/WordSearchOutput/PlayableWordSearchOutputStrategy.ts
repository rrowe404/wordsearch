import { Injectable } from '@angular/core';
import { WordSearchOutputModule } from './WordSearchOutputModule';
import { WordSearchOutputStrategy } from 'src/Rules/WordSearchOutput/WordSearchOutputStrategy';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { PlayableEventService } from '../PlayableEvent/PlayableEventService';

/**
 * This one doesn't need to implement the abtract base class --
 * it's just going to fire an event to activate the playable game component
 */
@Injectable({
    providedIn: WordSearchOutputModule
})
export class PlayableWordSearchOutputStrategy implements WordSearchOutputStrategy{
    public static getValue() {
        return 'playable';
    }

    public static getViewValue() {
        return 'Playable';
    }

    constructor(private playableEventService: PlayableEventService) {
    }

    clean() {
        this.playableEventService.deactivate.emit();
    }

    output(currentState: WordSearchState) {
        this.playableEventService.activate.emit(currentState);
    }
}
