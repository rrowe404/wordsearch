import * as React from 'react';
import { WordTracker } from 'src/Rules/WordTracker/WordTracker';
import { PlayableWordSearchContext } from './PlayableWordSearchContext';

interface Props extends React.PropsWithChildren {
  wordTracker: WordTracker;
}

const PlayableWordSearchContextProvider: React.FC<Props> = ({
  children,
  wordTracker,
}) => {
  return (
    <PlayableWordSearchContext.Provider value={{ wordTracker }}>
      {children}
    </PlayableWordSearchContext.Provider>
  );
};

export { PlayableWordSearchContextProvider };
