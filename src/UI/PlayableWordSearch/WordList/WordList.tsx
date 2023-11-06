import * as React from 'react';
import { PlayableWordSearchContext } from '../PlayableWordSearchContext';

const WordList: React.FC = () => {
  const { wordSearchState, wordTracker } = React.useContext(
    PlayableWordSearchContext
  );
  const { wordList } = wordSearchState;

  const getWordListWordClasses = (word: string) => {
    let result = ['wordListWord'];

    if (wordTracker.isWordComplete(word)) {
      result.push('completed');
    }

    return result.join(' ');
  };

  return (
    <>
      {wordList.map((word, i) => {
        return (
          <div key={`${word}-${i}`} className={getWordListWordClasses(word)}>
            {word}
          </div>
        );
      })}
    </>
  );
};

export { WordList };
