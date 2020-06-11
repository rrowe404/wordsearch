import { WordPosition } from '../WordPosition/WordPosition';
import { WordPositionServiceBase } from '../WordPosition/WordPositionServiceBase';

/**
 * Information needed to successfully place a word.
 */
export interface WordStartParameters {
    startPosition: WordPosition;
    positionService: WordPositionServiceBase;
}
