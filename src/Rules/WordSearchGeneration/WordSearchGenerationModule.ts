import { NgModule } from '@angular/core';
import { WordValidationModule } from '../WordValidation/WordValidationModule';
import { PlayableWordSearchModule } from 'src/UI/PlayableWordSearch/PlayableWordSearchModule';

@NgModule({
    imports: [
        PlayableWordSearchModule,
        WordValidationModule
    ]
})
export class WordSearchGenerationModule {
}
