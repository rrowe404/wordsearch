import { NgModule } from '@angular/core';
import { ArrayGenerationModule } from 'src/Rules/ArrayGeneration/ArrayGenerationModule';
import { LetterPlaceholderModule } from 'src/Rules/LetterPlaceholder/LetterPlaceholderModule';
import { WordSearchGenerationStrategyModule } from 'src/Rules/WordSearchGenerationStrategy/WordSearchGenerationStrategyModule';

@NgModule({
    imports: [
        ArrayGenerationModule,
        LetterPlaceholderModule,
        WordSearchGenerationStrategyModule
    ]
})
export class WordSearchGenerationModule {
}