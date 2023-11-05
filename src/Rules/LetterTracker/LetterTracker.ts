import { LetterWithPosition } from '../LetterWithPosition/LetterWithPosition';

class LetterTracker {
  map: Record<string, boolean> = {};

  private getKey(letterWithPosition: LetterWithPosition): string {
    return `${letterWithPosition.row}-${letterWithPosition.column}`;
  }

  private completeLetter(key: string) {
    this.map[key] = true;
  }

  completeLetters(...lettersWithPositions: LetterWithPosition[]) {
    lettersWithPositions.forEach((lwp) =>
      this.completeLetter(this.getKey(lwp))
    );
  }

  isLetterComplete(letterWithPosition: LetterWithPosition) {
    return this.map[this.getKey(letterWithPosition)];
  }
}

export { LetterTracker };
