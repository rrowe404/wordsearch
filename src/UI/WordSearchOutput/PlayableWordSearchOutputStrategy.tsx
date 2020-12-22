import * as React from 'react';
import { WordSearchOutputStrategy } from 'src/Rules/WordSearchOutput/WordSearchOutputStrategy';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { PlayableWordSearchComponent } from 'src/UI/PlayableWordSearch/PlayableWordSearchComponent';

/**
 * This one doesn't need to implement the abtract base class --
 * it's just going to fire an event to activate the playable game component
 */
export class PlayableWordSearchOutputStrategy implements WordSearchOutputStrategy {
    public static getValue() {
        return 'playable';
    }

    public static getViewValue() {
        return 'Playable';
    }

    clean() {
        // TODO
    }

    output(currentState: WordSearchState) {
        // TODO
        return <PlayableWordSearchComponent state={currentState} />;
    }
}
