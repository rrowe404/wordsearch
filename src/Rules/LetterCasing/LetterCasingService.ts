import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordSearchStateFactory } from '../WordSearchState/WordSearchStateFactory';

export class LetterCasingService {
  private wordSearchStateFactory = new WordSearchStateFactory();

  case(currentState: WordSearchState) {
    const state =
      this.wordSearchStateFactory.createWordSearchCopy(currentState);

    state.iterate((letter, row, column) => {
      state.setValueAt(row, column, letter.toUpperCase());
    });

    return state;
  }
}
