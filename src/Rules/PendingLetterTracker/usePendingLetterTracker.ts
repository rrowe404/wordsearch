import * as React from 'react';
import { useState } from 'react';
import { Position } from '../Position/Position';

export interface PendingLetterTracker {
  clear: () => void;
  pending: Position;
  hasPending: () => boolean;
  isPending: (position: Position) => boolean;
  setPending: React.Dispatch<React.SetStateAction<Position>>;
}

export const usePendingLetterTracker = (): PendingLetterTracker => {
  const [pending, setPending] = useState<Position>(null);

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
