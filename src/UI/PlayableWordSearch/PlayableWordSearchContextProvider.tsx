import * as React from 'react';
import { LetterTracker } from 'src/Rules/LetterTracker/useLetterTracker';
import { PendingLetterTracker } from 'src/Rules/PendingLetterTracker/usePendingLetterTracker';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { WordTracker } from 'src/Rules/WordTracker/useWordTracker';
import { PlayableWordSearchContext } from './PlayableWordSearchContext';

interface Props extends React.PropsWithChildren {
  letterSize: number;
  letterTracker: LetterTracker;
  startLetterTracker: PendingLetterTracker;
  tableWidth: number;
  wordSearchState: WordSearchState;
  wordTracker: WordTracker;
}

const PlayableWordSearchContextProvider: React.FC<Props> = ({
  children,
  letterSize,
  letterTracker,
  startLetterTracker,
  tableWidth,
  wordSearchState,
  wordTracker,
}) => {
  return (
    <PlayableWordSearchContext.Provider
      value={{
        letterSize,
        startLetterTracker,
        letterTracker,
        tableWidth,
        wordSearchState,
        wordTracker,
      }}
    >
      {children}
    </PlayableWordSearchContext.Provider>
  );
};

export { PlayableWordSearchContextProvider };
