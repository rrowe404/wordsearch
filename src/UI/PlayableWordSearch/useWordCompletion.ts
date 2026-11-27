import { useEffect } from 'react';
import { useLetterTracker } from 'src/Rules/LetterTracker/useLetterTracker';
import { usePendingLetterTracker } from 'src/Rules/PendingLetterTracker/usePendingLetterTracker';
import { WordBuilderService } from 'src/Rules/WordBuilder/WordBuilderService';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { useWordTracker } from 'src/Rules/WordTracker/useWordTracker';

const wordBuilderService = new WordBuilderService();

interface WordCompletion {
  winner: boolean;
  letterTracker: ReturnType<typeof useLetterTracker>;
  startLetterTracker: ReturnType<typeof usePendingLetterTracker>;
  endLetterTracker: ReturnType<typeof usePendingLetterTracker>;
  wordTracker: ReturnType<typeof useWordTracker>;
}

export const useWordCompletion = (
  wordSearchState: WordSearchState
): WordCompletion => {
  const wordTracker = useWordTracker(wordSearchState.wordList);
  const letterTracker = useLetterTracker();
  const startLetterTracker = usePendingLetterTracker();
  const endLetterTracker = usePendingLetterTracker();

  useEffect(() => {
    if (!startLetterTracker.hasPending() || !endLetterTracker.hasPending()) {
      return;
    }

    const wordBuilderResult = wordBuilderService.build(
      wordSearchState,
      startLetterTracker.pending,
      endLetterTracker.pending
    );
    const offcasedWord = wordBuilderResult?.word;
    const accuratelyCasedWord = offcasedWord
      ? wordSearchState.wordList.find(
          (word) => word.toLowerCase() === offcasedWord.toLowerCase()
        )
      : null;

    if (wordBuilderResult && accuratelyCasedWord) {
      wordTracker.completeWord(accuratelyCasedWord);
      letterTracker.completeLetters(...wordBuilderResult.lettersWithPositions);
    }

    startLetterTracker.clear();
    endLetterTracker.clear();
  }, [
    endLetterTracker.pending,
    startLetterTracker.pending,
    wordSearchState,
  ]);

  return {
    winner: wordTracker.isComplete(),
    letterTracker,
    startLetterTracker,
    endLetterTracker,
    wordTracker,
  };
};
