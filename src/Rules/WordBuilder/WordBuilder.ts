import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { WordBuilderResult } from './WordBuilderResult';
import { Position } from '../Position/Position';

/** Returns a word from the current state, given the positions it starts and ends */
export interface WordBuilder {
  shouldUse(start: Position, end: Position): boolean;
  build(
    currentState: WordSearchState,
    start: Position,
    end: Position
  ): WordBuilderResult;
}
