import { LetterWithPosition } from '../LetterWithPosition/LetterWithPosition';
import { Position } from '../Position/Position';

class LetterTracker {
  map: Record<string, boolean> = {};

  private getKey(position: Position): string {
    return `${position.row}-${position.column}`;
  }

  private completeLetter(key: string) {
    this.map[key] = true;
  }

  completeLetters(...lettersWithPositions: LetterWithPosition[]) {
    lettersWithPositions.forEach((lwp) =>
      this.completeLetter(this.getKey(lwp))
    );
  }

  isLetterComplete(position: Position) {
    return this.map[this.getKey(position)];
  }
}

export { LetterTracker };
