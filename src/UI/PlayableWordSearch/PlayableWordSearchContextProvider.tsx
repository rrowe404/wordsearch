import * as React from 'react';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { WordTracker } from 'src/Rules/WordTracker/WordTracker';
import { PlayableWordSearchContext } from './PlayableWordSearchContext';

interface Props extends React.PropsWithChildren {
  letterSize: number;
  tableWidth: number;
  wordSearchState: WordSearchState;
  wordTracker: WordTracker;
}

const PlayableWordSearchContextProvider: React.FC<Props> = ({
  children,
  letterSize,
  tableWidth,
  wordSearchState,
  wordTracker,
}) => {
  return (
    <PlayableWordSearchContext.Provider
      value={{ letterSize, tableWidth, wordSearchState, wordTracker }}
    >
      {children}
    </PlayableWordSearchContext.Provider>
  );
};

export { PlayableWordSearchContextProvider };
