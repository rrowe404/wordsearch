import { NgModule } from '@angular/core';
import { LetterPlaceholderModule } from 'src/LetterPlaceholder/LetterPlaceholderModule';
import { WordSearchGenerationStrategyModule } from 'src/WordSearchGenerationStrategy/WordSearchGenerationStrategyModule';

@NgModule({
    imports: [
        LetterPlaceholderModule,
        WordSearchGenerationStrategyModule
    ]
})
export class WordSearchGenerationModule {
}