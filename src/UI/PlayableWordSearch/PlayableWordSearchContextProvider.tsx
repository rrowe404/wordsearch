import * as React from 'react';
import { LetterTracker } from 'src/Rules/LetterTracker/LetterTracker';
import { PendingLetterTracker } from 'src/Rules/PendingLetterTracker/PendingLetterTracker';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { WordTracker } from 'src/Rules/WordTracker/WordTracker';
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
