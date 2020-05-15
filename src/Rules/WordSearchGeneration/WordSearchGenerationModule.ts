import { NgModule } from '@angular/core';
import { LetterPlaceholderModule } from 'src/Rules/LetterPlaceholder/LetterPlaceholderModule';
import { WordSearchGenerationStrategyModule } from 'src/Rules/WordSearchGenerationStrategy/WordSearchGenerationStrategyModule';
import { WordSearchStateModule } from 'src/Rules/WordSearchState/WordSearchStateModule';

@NgModule({
    imports: [
        LetterPlaceholderModule,
        WordSearchGenerationStrategyModule,
        WordSearchStateModule
    ]
})
export class WordSearchGenerationModule {
}