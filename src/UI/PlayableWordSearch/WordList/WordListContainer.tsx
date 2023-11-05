import * as React from 'react';
import { PlayableWordSearchContext } from '../PlayableWordSearchContext';

const WordListContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { tableWidth, wordSearchState } = React.useContext(
    PlayableWordSearchContext
  );
  const { showWordList } = wordSearchState;

  if (!showWordList) {
    return null;
  }

  return (
    <div className='wordListContainer' style={{ maxWidth: tableWidth }}>
      {children}
    </div>
  );
};

export { WordListContainer };
