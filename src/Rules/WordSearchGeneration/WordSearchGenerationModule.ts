import { NgModule } from '@angular/core';
import { WordSearchStateModule } from 'src/Rules/WordSearchState/WordSearchStateModule';
import { WordValidationModule } from '../WordValidation/WordValidationModule';
import { PlayableWordSearchModule } from 'src/UI/PlayableWordSearch/PlayableWordSearchModule';

@NgModule({
    imports: [
        PlayableWordSearchModule,
        WordSearchStateModule,
        WordValidationModule
    ]
})
export class WordSearchGenerationModule {
}
