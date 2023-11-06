import * as React from 'react';
import { useState } from 'react';
import { LetterWithPosition } from '../LetterWithPosition/LetterWithPosition';
import { Position } from '../Position/Position';

export interface PendingLetterTracker {
  clear: () => void;
  pending: LetterWithPosition;
  hasPending: () => boolean;
  isPending: (position: Position) => boolean;
  setPending: React.Dispatch<React.SetStateAction<LetterWithPosition>>;
}

export const usePendingLetterTracker = (): PendingLetterTracker => {
  const [pending, setPending] = useState<LetterWithPosition>(null);

  return {
    pending,
    clear: () => {
      setPending(null);
    },
    hasPending: () => !!pending,
    isPending: (position) =>
      position &&
      pending &&
      position.column === pending.column &&
      position.row === pending.row,
    setPending,
  };
};
