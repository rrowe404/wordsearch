import * as React from 'react';
import { LetterTracker } from 'src/Rules/LetterTracker/LetterTracker';
import { PendingLetterTracker } from 'src/Rules/PendingLetterTracker/PendingLetterTracker';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { WordTracker } from 'src/Rules/WordTracker/WordTracker';

interface PlayableWordSearchContextInterface {
  letterSize: number;
  letterTracker: LetterTracker;
  startLetterTracker: PendingLetterTracker;
  tableWidth: number;
  wordSearchState: WordSearchState;
  wordTracker: WordTracker;
}

const PlayableWordSearchContext =
  React.createContext<PlayableWordSearchContextInterface>({
    letterSize: 0,
    letterTracker: null,
    startLetterTracker: null,
    tableWidth: 0,
    wordSearchState: null,
    wordTracker: null,
  });

export { PlayableWordSearchContext };
