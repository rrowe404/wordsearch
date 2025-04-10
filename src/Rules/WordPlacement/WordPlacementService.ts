import { ProfanityFilterService } from '../ProfanityFilter/ProfanityFilterService';
import { RandomNumberGeneratorService } from '../RandomNumberGenerator/RandomNumberGeneratorService';
import { StringUtils } from '../StringUtils/StringUtils';
import { WordDirectionSelectorService } from '../WordDirection/WordDirectionSelectorService';
import { WordOrientation } from '../WordOrientation/WordOrientation';
import { WordPosition } from '../WordPosition/WordPosition';
import { WordPositionServiceBase } from '../WordPosition/WordPositionServiceBase';
import { WordPositionServiceFactory } from '../WordPosition/WordPositionServiceFactory';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordSearchStateFactory } from '../WordSearchState/WordSearchStateFactory';
import { WordStartParameters } from '../WordStartParameters/WordStartParameters';

export class WordPlacementService {
  private profanityFilterService = new ProfanityFilterService();
  private randomNumberGeneratorService = new RandomNumberGeneratorService();
  private stringUtils = new StringUtils();
  private wordDirectionSelectorService = new WordDirectionSelectorService();
  private wordPositionServiceFactory = new WordPositionServiceFactory();
  private wordSearchStateFactory = new WordSearchStateFactory();

  public placeWords(currentState: WordSearchState) {
    const state: WordSearchState = this.wordSearchStateFactory.createWordSearchCopy(currentState);

    state.words.forEach((word) => {
      this.placeWord(state, word);
    });

    return state;
  }

  private placeWord(currentState: WordSearchState, word: string) {
    // prevent reversed words from showing up reversed in word list
    const logWord = word;

    const orientation = this.randomNumberGeneratorService.getRandomValueFrom(
      currentState.orientations
    );

    if (orientation === WordOrientation.Backwards) {
      word = this.stringUtils.reverseWord(word);
    }

    const startParams = this.getStartParameters(currentState, word);

    if (startParams && startParams.startPosition) {
      this.placeLetters(currentState, word, startParams);
      currentState.acceptWord(logWord);
    }

    return currentState;
  }

  /**
   * determine start position.
   * try one randomly selected direction at a time.
   * if no valid start positions exist, try another direction.
   * if zealous overlapping is on, we'll first try to find start positions with overlaps.
   * if there are none in any direction, then do it again without.
   */
  private getStartParameters(
    currentState: WordSearchState,
    word: string
  ): WordStartParameters {
    const validDirections = this.wordDirectionSelectorService.selectDirections(
      currentState,
      word
    );

    if (!validDirections?.length) {
      return null;
    }

    let attemptedDirections = [];

    let startPosition: WordPosition = null;
    let positionService: WordPositionServiceBase;
    let zealousOverlaps = currentState.zealousOverlaps;

    do {
      const directionsLeftToAttempt = validDirections.filter(
        (d) => !attemptedDirections.includes(d)
      );
      const direction = this.randomNumberGeneratorService.getRandomValueFrom(
        directionsLeftToAttempt
      );

      positionService = this.wordPositionServiceFactory.getService(direction);
      let validStartPositions = positionService.getValidStartPositions(
        currentState,
        word
      );

      if (zealousOverlaps) {
        validStartPositions =
          this.getZealousOverlappingStartPositions(validStartPositions);
      }

      if (validStartPositions.length) {
        startPosition =
          this.randomNumberGeneratorService.getRandomValueFrom(
            validStartPositions
          );

        return {
          startPosition,
          positionService,
        };
      }

      attemptedDirections.push(direction);

      if (
        zealousOverlaps &&
        attemptedDirections.length === validDirections.length &&
        !startPosition
      ) {
        zealousOverlaps = false;
        attemptedDirections = [];
      }
    } while (attemptedDirections.length < validDirections.length);

    return null;
  }

  private getZealousOverlappingStartPositions(
    validStartPositions: WordPosition[]
  ) {
    const overlappingStartPositions = validStartPositions.filter(
      (p) => p.hasOverlaps
    );

    return overlappingStartPositions;
  }

  private placeLetters(
    currentState: WordSearchState,
    word: string,
    startParams: WordStartParameters
  ) {
    const letters = word.split('');
    const length = letters.length;

    // place the letters into position
    for (let i = 0; i < length; i++) {
      const nextPosition = startParams.positionService.getNextPosition(
        startParams.startPosition,
        i
      );
      currentState.setValueAt(
        nextPosition.row,
        nextPosition.column,
        letters[i]
      );
    }
  }
}
