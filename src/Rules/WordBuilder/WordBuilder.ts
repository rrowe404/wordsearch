import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { LetterWithPosition } from 'src/Rules/LetterWithPosition/LetterWithPosition';
import { WordBuilderResult } from './WordBuilderResult';

/** Returns a word from the current state, given the positions it starts and ends */
export interface WordBuilder {
    build(currentState: WordSearchState, start: LetterWithPosition, end: LetterWithPosition): WordBuilderResult;
}
