import * as React from 'react';
import { PlayableWordSearchContext } from '../PlayableWordSearchContext';

interface WordListContainerProps extends React.PropsWithChildren {
  ref: React.RefObject<HTMLDivElement>;
}

const WordListContainer: React.FC<WordListContainerProps> = ({ children, ref }) => {
  const { tableWidth, wordSearchState } = React.useContext(
    PlayableWordSearchContext
  );
  const { showWordList } = wordSearchState;

  if (!showWordList) {
    return null;
  }

  return (
    <div className='wordListContainer' ref={ref} style={{ maxWidth: tableWidth }}>
      {children}
    </div>
  );
};

export { WordListContainer };
