import { NgModule } from '@angular/core';
import { WordSearchGeneratorFormModule } from './WordSearchGeneratorForm/WordSearchGeneratorFormModule';
import { PlayableWordSearchModule } from './PlayableWordSearch/PlayableWordSearchModule';

@NgModule({
    imports: [
        PlayableWordSearchModule,
        WordSearchGeneratorFormModule
    ],
    exports: [
        PlayableWordSearchModule,
        WordSearchGeneratorFormModule
    ]
})
export class UIModule {
}
