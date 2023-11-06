import { useState } from 'react';
import { LetterWithPosition } from '../LetterWithPosition/LetterWithPosition';
import { Position } from '../Position/Position';

export interface LetterTracker {
  completeLetters: (...lettersWithPositions: LetterWithPosition[]) => void;
  isLetterComplete: (position: Position) => boolean;
}

function getKey(position: Position): string {
  return `${position.row}-${position.column}`;
}

export const useLetterTracker = (): LetterTracker => {
  const [map, setMap] = useState<Record<string, boolean>>({});

  function completeLetters(keys: string[]): void {
    const result = { ...map };
    keys.forEach((key) => (result[key] = true));
    setMap(result);
  }

  return {
    completeLetters: (...lettersWithPositions: LetterWithPosition[]) => {
      completeLetters(lettersWithPositions.map((lwp) => getKey(lwp)));
    },
    isLetterComplete: (position: Position) => {
      const key = getKey(position);

      return map[key] ?? false;
    },
  };
};
