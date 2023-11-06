import { WordBuilder } from './WordBuilder';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { WordBuilderResult } from './WordBuilderResult';
import { HorizontalWordBuilder } from './HorizontalWordBuilder';
import { VerticalWordBuilder } from './VerticalWordBuilder';
import { DiagonalWordBuilder } from './DiagonalWordBuilder';
import { Position } from '../Position/Position';

export class WordBuilderService {
  private wordBuilders: WordBuilder[] = [
    new HorizontalWordBuilder(),
    new VerticalWordBuilder(),
    new DiagonalWordBuilder(),
  ];

  build(
    currentState: WordSearchState,
    start: Position,
    end: Position
  ): WordBuilderResult {
    for (const builder of this.wordBuilders) {
      if (builder.shouldUse(start, end)) {
        return builder.build(currentState, start, end);
      }
    }

    return null;
  }
}
