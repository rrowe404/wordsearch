import { NgModule } from "@angular/core";
import { ArrayGenerationModule } from './ArrayGeneration/ArrayGenerationModule';
import { LetterPlaceholderModule } from './LetterPlaceholder/LetterPlaceholderModule';
import { RandomNumberGeneratorModule } from './RandomNumberGenerator/RandomNumberGeneratorModule';
import { WordPlacementStrategyModule } from './WordPlacementStrategy/WordPlacementStrategyModule';
import { WordSearchGenerationModule } from './WordSearchGeneration/WordSearchGenerationModule';
import { WordSearchGenerationStrategyModule } from './WordSearchGenerationStrategy/WordSearchGenerationStrategyModule';
import { WordSearchStateModule } from './WordSearchState/WordSearchStateModule';
import { WordValidationModule } from './WordValidation/WordValidationModule';
import { WordDirectionModule } from './WordDirection/WordDirectionModule';

@NgModule({
    imports: [
        ArrayGenerationModule,
        LetterPlaceholderModule,
        RandomNumberGeneratorModule,
        WordDirectionModule,
        WordPlacementStrategyModule,
        WordSearchGenerationModule,
        WordSearchGenerationStrategyModule,
        WordSearchStateModule,
        WordValidationModule
    ],
    exports: [
        ArrayGenerationModule,
        LetterPlaceholderModule,
        RandomNumberGeneratorModule,
        WordDirectionModule,
        WordPlacementStrategyModule,
        WordSearchGenerationModule,
        WordSearchGenerationStrategyModule,
        WordSearchStateModule,
        WordValidationModule
    ]

})
export class RulesModule {
}