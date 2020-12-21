import { WordBuilder } from './WordBuilder';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { LetterWithPosition } from 'src/Rules/LetterWithPosition/LetterWithPosition';
import { WordBuilderResult } from './WordBuilderResult';
import { HorizontalWordBuilder } from './HorizontalWordBuilder';
import { VerticalWordBuilder } from './VerticalWordBuilder';
import { DiagonalWordBuilder } from './DiagonalWordBuilder';

export class WordBuilderService {
    private wordBuilders: WordBuilder[] = [
        new HorizontalWordBuilder(),
        new VerticalWordBuilder(),
        new DiagonalWordBuilder()
    ]

    build(currentState: WordSearchState, start: LetterWithPosition, end: LetterWithPosition): WordBuilderResult {
        for (let builder of this.wordBuilders) {
            if (builder.shouldUse(start, end)) {
                return builder.build(currentState, start, end);
            }
        }

        return null;
    }
}
