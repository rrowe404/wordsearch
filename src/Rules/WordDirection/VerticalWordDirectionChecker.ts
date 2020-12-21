import { WordDirectionChecker } from './WordDirectionChecker';
import { WordSearchState } from '../WordSearchState/WordSearchState';

export class VerticalWordDirectionChecker implements WordDirectionChecker {
    checkDirection(currentState: WordSearchState, word: string) {
        return word.length <= currentState.rows;
    }
}
