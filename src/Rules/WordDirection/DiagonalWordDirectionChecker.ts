import { WordDirectionChecker } from './WordDirectionChecker';
import { WordSearchState } from '../WordSearchState/WordSearchState';

export class DiagonalWordDirectionChecker implements WordDirectionChecker {
    checkDirection(currentState: WordSearchState, word: string) {
        return word.length <= currentState.columns && word.length <= currentState.rows;
    }
}
