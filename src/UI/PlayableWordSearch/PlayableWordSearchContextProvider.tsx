import * as React from 'react';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { WordTracker } from 'src/Rules/WordTracker/WordTracker';
import { PlayableWordSearchContext } from './PlayableWordSearchContext';

interface Props extends React.PropsWithChildren {
  wordSearchState: WordSearchState;
  wordTracker: WordTracker;
}

const PlayableWordSearchContextProvider: React.FC<Props> = ({
  children,
  wordSearchState,
  wordTracker,
}) => {
  return (
    <PlayableWordSearchContext.Provider
      value={{ wordSearchState, wordTracker }}
    >
      {children}
    </PlayableWordSearchContext.Provider>
  );
};

export { PlayableWordSearchContextProvider };
