import * as React from 'react';
import { WordTracker } from 'src/Rules/WordTracker/WordTracker';

interface PlayableWordSearchContextInterface {
  wordTracker: WordTracker;
}

const PlayableWordSearchContext =
  React.createContext<PlayableWordSearchContextInterface>({
    wordTracker: null,
  });

export { PlayableWordSearchContext };
