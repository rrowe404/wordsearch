import { LetterWithPosition } from '../LetterWithPosition/LetterWithPosition';
import { Position } from '../Position/Position';

class PendingLetterTracker {
  private pending: LetterWithPosition;

  clear() {
    this.pending = null;
  }

  getPending() {
    return this.pending;
  }

  setPending(letter: LetterWithPosition) {
    this.pending = letter;
  }

  hasPending() {
    return !!this.pending;
  }

  isPending(position: Position) {
    const { row, column } = position;

    return (
      this.pending && this.pending.row === row && this.pending.column === column
    );
  }
}

export { PendingLetterTracker };
