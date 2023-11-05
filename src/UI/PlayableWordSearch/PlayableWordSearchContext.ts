import * as React from 'react';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { WordTracker } from 'src/Rules/WordTracker/WordTracker';

interface PlayableWordSearchContextInterface {
  wordSearchState: WordSearchState;
  wordTracker: WordTracker;
}

const PlayableWordSearchContext =
  React.createContext<PlayableWordSearchContextInterface>({
    wordSearchState: null,
    wordTracker: null,
  });

export { PlayableWordSearchContext };
