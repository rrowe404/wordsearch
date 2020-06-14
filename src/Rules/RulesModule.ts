import { NgModule } from '@angular/core';
import { ArrayGenerationModule } from './ArrayGeneration/ArrayGenerationModule';
import { LetterPlaceholderModule } from './LetterPlaceholder/LetterPlaceholderModule';
import { RandomNumberGeneratorModule } from './RandomNumberGenerator/RandomNumberGeneratorModule';
import { WordSearchGenerationModule } from './WordSearchGeneration/WordSearchGenerationModule';
import { WordSearchStateModule } from './WordSearchState/WordSearchStateModule';
import { WordValidationModule } from './WordValidation/WordValidationModule';
import { WordDirectionModule } from './WordDirection/WordDirectionModule';
import { StringUtilsModule } from './StringUtils/StringUtilsModule';
import { LetterCasingModule } from './LetterCasing/LetterCasingModule';
import { WordPositionModule } from './WordPosition/WordPositionModule';
import { WordBuilderModule } from './WordBuilder/WordBuilderModule';

@NgModule({
    imports: [
        ArrayGenerationModule,
        LetterCasingModule,
        LetterPlaceholderModule,
        RandomNumberGeneratorModule,
        StringUtilsModule,
        WordBuilderModule,
        WordDirectionModule,
        WordPositionModule,
        WordSearchGenerationModule,
        WordSearchStateModule,
        WordValidationModule
    ],
    exports: [
        ArrayGenerationModule,
        LetterCasingModule,
        LetterPlaceholderModule,
        RandomNumberGeneratorModule,
        StringUtilsModule,
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
