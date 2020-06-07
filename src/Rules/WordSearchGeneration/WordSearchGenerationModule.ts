import { NgModule } from '@angular/core';
import { LetterPlaceholderModule } from 'src/Rules/LetterPlaceholder/LetterPlaceholderModule';
import { WordSearchStateModule } from 'src/Rules/WordSearchState/WordSearchStateModule';
import { WordValidationModule } from '../WordValidation/WordValidationModule';
import { WordPositionModule } from '../WordPosition/WordPositionModule';

@NgModule({
    imports: [
        LetterPlaceholderModule,
        WordPositionModule,
        WordSearchStateModule,
        WordValidationModule
    ]
})
export class WordSearchGenerationModule {
}
