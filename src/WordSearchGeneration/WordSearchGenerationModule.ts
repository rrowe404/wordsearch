import { NgModule } from '@angular/core';
import { ArrayGenerationModule } from 'src/ArrayGeneration/ArrayGenerationModule';
import { LetterPlaceholderModule } from 'src/LetterPlaceholder/LetterPlaceholderModule';
import { WordSearchGenerationStrategyModule } from 'src/WordSearchGenerationStrategy/WordSearchGenerationStrategyModule';

@NgModule({
    imports: [
        ArrayGenerationModule,
        LetterPlaceholderModule,
        WordSearchGenerationStrategyModule
    ]
})
export class WordSearchGenerationModule {
}