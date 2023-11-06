import { useState } from 'react';

export interface WordTracker {
  completeWord: (word: string) => void;
  isComplete(): boolean;
  isWordComplete: (word: string) => boolean;
}

export const useWordTracker = (words: string[]): WordTracker => {
  const [map, setMap] = useState<Record<string, boolean>>(
    Object.fromEntries(words.map((key) => [key, false]))
  );

  function isWordComplete(word: string): boolean {
    return map[word];
  }

  return {
    completeWord: (word: string) => {
      setMap({ ...map, [word]: true });
    },
    isComplete: () => {
      return Object.keys(map).every((key) => isWordComplete(key));
    },
    isWordComplete,
  };
};
