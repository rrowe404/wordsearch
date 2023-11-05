import * as React from 'react';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { WordTracker } from 'src/Rules/WordTracker/WordTracker';

interface PlayableWordSearchContextInterface {
  letterSize: number;
  tableWidth: number;
  wordSearchState: WordSearchState;
  wordTracker: WordTracker;
}

const PlayableWordSearchContext =
  React.createContext<PlayableWordSearchContextInterface>({
    letterSize: 0,
    tableWidth: 0,
    wordSearchState: null,
    wordTracker: null,
  });

export { PlayableWordSearchContext };
