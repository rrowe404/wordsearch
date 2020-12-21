import { NgModule } from '@angular/core';
import { WordSearchStateModule } from 'src/Rules/WordSearchState/WordSearchStateModule';
import { WordValidationModule } from '../WordValidation/WordValidationModule';
import { WordPositionModule } from '../WordPosition/WordPositionModule';
import { PlayableWordSearchModule } from 'src/UI/PlayableWordSearch/PlayableWordSearchModule';

@NgModule({
    imports: [
        PlayableWordSearchModule,
        WordPositionModule,
        WordSearchStateModule,
        WordValidationModule
    ]
})
export class WordSearchGenerationModule {
}
