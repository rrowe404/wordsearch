import { WordSearchState } from '../WordSearchState/WordSearchState';
import { LetterWithPosition } from '../LetterWithPosition/LetterWithPosition';

/**
 * This class doesn't implement the WordSearchStateSlicer interface nor should it be injectable
 * It's only used to share the main loop between the two injectable services
 */
export class DiagonalWordSearchStateSlicer {
  private bottomsUp = false;

  /**
   * totally stolen from https://stackoverflow.com/questions/35917734/how-do-i-traverse-an-array-diagonally-in-javascript
   * what, you thought I wanted to think about this?? :D :D :D
   */
  public createSlice(
    currentState: WordSearchState,
    lettersWithPositions: LetterWithPosition[]
  ): LetterWithPosition[][] {
    const slice: LetterWithPosition[][] = [];

    const yLength = currentState.rows;
    const xLength = currentState.columns;
    const maxLength = Math.max(yLength, xLength);

    let temp: LetterWithPosition[];

    for (let i = 0; i <= 2 * maxLength; ++i) {
      temp = [];

      for (let y = yLength - 1; y >= 0; --y) {
        // this is the only difference...
        const x = i - (this.bottomsUp ? yLength - y : y);

        if (x >= 0 && x < xLength) {
          temp.push(
            lettersWithPositions.filter(
              (lwp) => lwp.row === y && lwp.column === x
            )[0]
          );
        }
      }

      if (temp.length) {
        slice.push(temp);
      }
    }

    return slice;
  }

  public setBottomsUp() {
    this.bottomsUp = true;
    return this;
  }

  public setTopDown() {
    this.bottomsUp = false;
    return this;
  }
}
