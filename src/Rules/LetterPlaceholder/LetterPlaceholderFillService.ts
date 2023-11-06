import { LetterPlaceholder } from './LetterPlaceholder';
import { RandomNumberGeneratorService } from 'src/Rules/RandomNumberGenerator/RandomNumberGeneratorService';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { LetterWithPosition } from '../LetterWithPosition/LetterWithPosition';
import { ProfanityFilterService } from '../ProfanityFilter/ProfanityFilterService';
import { WordSearchStateFactory } from '../WordSearchState/WordSearchStateFactory';

export class LetterPlaceholderFillService {
  private randomNumberGeneratorService = new RandomNumberGeneratorService();
  private wordSearchStateFactory = new WordSearchStateFactory();

  // public for testability, need DI -- TODO
  public profanityFilterService = new ProfanityFilterService();

  private alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  public fill(currentState: WordSearchState) {
    const state =
      this.wordSearchStateFactory.createWordSearchCopy(currentState);

    const userPlacedLetters: LetterWithPosition[] = [];

    state.iterate((letter, row, column) => {
      if (letter === LetterPlaceholder.value) {
        const fillLetter = this.getFillLetter();
        state.setValueAt(row, column, fillLetter);
      } else {
        userPlacedLetters.push({ letter, row, column });
      }
    });

    if (state.filterAccidentalProfanity) {
      let changesMade = true;

      // need to keep doing this until no profanity is left
      while (changesMade) {
        changesMade = this.profanityFilterService.filterProfanity(
          state,
          userPlacedLetters
        );

        if (changesMade) {
          // then iterate and fill again
          state.iterate((letter, row, column) => {
            if (letter === LetterPlaceholder.value) {
              const fillLetter = this.getFillLetter();
              state.setValueAt(row, column, fillLetter);
            }
          });
        }
      }
    }

    return state;
  }

  // public for testability, should maybe be separate -- TODO
  public getFillLetter() {
    return this.randomNumberGeneratorService.getRandomValueFrom(this.alphabet);
  }
}
