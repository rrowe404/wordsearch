import * as React from 'react';
import { PlayableWordSearchContext } from '../PlayableWordSearchContext';

interface Props {
  wordList: string[];
}

const WordList: React.FC<Props> = ({ wordList }) => {
  const { wordTracker } = React.useContext(PlayableWordSearchContext);

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
