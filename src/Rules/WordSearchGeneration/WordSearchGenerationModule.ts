import { NgModule } from '@angular/core';
import { LetterPlaceholderModule } from 'src/Rules/LetterPlaceholder/LetterPlaceholderModule';
import { WordSearchStateModule } from 'src/Rules/WordSearchState/WordSearchStateModule';
import { WordPlacementStrategyModule } from '../WordPlacementStrategy/WordPlacementStrategyModule';
import { WordValidationModule } from '../WordValidation/WordValidationModule';

@NgModule({
    imports: [
        LetterPlaceholderModule,
        WordPlacementStrategyModule,
        WordSearchStateModule,
        WordValidationModule
    ]
})
export class WordSearchGenerationModule {
}
