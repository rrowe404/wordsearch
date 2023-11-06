import { WordDirectionCheckerFactory } from './WordDirectionCheckerFactory';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordDirection } from './WordDirection';

export class WordDirectionSelectorService {
  private wordDirectionCheckerFactory = new WordDirectionCheckerFactory();

  /**
   * Get the directions that the current word can fit in
   */
  public selectDirections(
    currentState: WordSearchState,
    word: string
  ): WordDirection[] {
    return currentState.directions.filter((direction) => {
      const checker =
        this.wordDirectionCheckerFactory.getDirectionChecker(direction);

      return checker.checkDirection(currentState, word);
    });
  }
}
