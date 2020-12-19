import { NgModule } from '@angular/core';
import { ArrayGenerationModule } from './ArrayGeneration/ArrayGenerationModule';
import { LetterPlaceholderModule } from './LetterPlaceholder/LetterPlaceholderModule';
import { WordSearchGenerationModule } from './WordSearchGeneration/WordSearchGenerationModule';
import { WordSearchStateModule } from './WordSearchState/WordSearchStateModule';
import { WordValidationModule } from './WordValidation/WordValidationModule';
import { WordDirectionModule } from './WordDirection/WordDirectionModule';
import { WordPositionModule } from './WordPosition/WordPositionModule';
import { WordBuilderModule } from './WordBuilder/WordBuilderModule';

@NgModule({
    imports: [
        ArrayGenerationModule,
        LetterPlaceholderModule,
        WordBuilderModule,
        WordDirectionModule,
        WordPositionModule,
        WordSearchGenerationModule,
        WordSearchStateModule,
        WordValidationModule
    ],
    exports: [
        ArrayGenerationModule,
        LetterPlaceholderModule,
        WordBuilderModule,
        WordDirectionModule,
        WordPositionModule,
        WordSearchGenerationModule,
        WordSearchStateModule,
        WordValidationModule
    ]
})
export class RulesModule {
}
