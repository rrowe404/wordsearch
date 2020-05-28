import { NgModule } from "@angular/core";
import { ArrayGenerationModule } from './ArrayGeneration/ArrayGenerationModule';
import { LetterPlaceholderModule } from './LetterPlaceholder/LetterPlaceholderModule';
import { RandomNumberGeneratorModule } from './RandomNumberGenerator/RandomNumberGeneratorModule';
import { WordPlacementStrategyModule } from './WordPlacementStrategy/WordPlacementStrategyModule';
import { WordSearchGenerationModule } from './WordSearchGeneration/WordSearchGenerationModule';
import { WordSearchStateModule } from './WordSearchState/WordSearchStateModule';
import { WordValidationModule } from './WordValidation/WordValidationModule';
import { WordDirectionModule } from './WordDirection/WordDirectionModule';
import { StringUtilsModule } from './StringUtils/StringUtilsModule';
import { LetterCasingModule } from './LetterCasing/LetterCasingModule';

@NgModule({
    imports: [
        ArrayGenerationModule,
        LetterCasingModule,
        LetterPlaceholderModule,
        RandomNumberGeneratorModule,
        StringUtilsModule,
        WordDirectionModule,
        WordPlacementStrategyModule,
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
        WordDirectionModule,
        WordPlacementStrategyModule,
        WordSearchGenerationModule,
        WordSearchStateModule,
        WordValidationModule
    ]

})
export class RulesModule {
}