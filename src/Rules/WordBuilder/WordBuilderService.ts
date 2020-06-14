import { Injectable, Inject } from '@angular/core';
import { WordBuilderModule } from './WordBuilderModule';
import { WordBuilder } from './WordBuilder';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { LetterWithPosition } from 'src/Rules/LetterWithPosition/LetterWithPosition';
import { WordBuilderResult } from './WordBuilderResult';
import { WORD_BUILDERS } from './WORD_BUILDERS';

@Injectable({
    providedIn: WordBuilderModule
})
export class WordBuilderService {
    constructor(
        @Inject(WORD_BUILDERS) private wordBuilders: WordBuilder[],
    ) {
    }

    build(currentState: WordSearchState, start: LetterWithPosition, end: LetterWithPosition): WordBuilderResult {
        for (let builder of this.wordBuilders) {
            if (builder.shouldUse(start, end)) {
                return builder.build(currentState, start, end);
            }
        }

        return null;
    }
}
