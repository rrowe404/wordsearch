import { NgModule } from '@angular/core';
import { CheckboxModule } from './Checkbox/CheckboxModule';
import { WordSearchGeneratorFormModule } from './WordSearchGeneratorForm/WordSearchGeneratorFormModule';
import { PlayableWordSearchModule } from './PlayableWordSearch/PlayableWordSearchModule';

@NgModule({
    imports: [
        CheckboxModule,
        PlayableWordSearchModule,
        WordSearchGeneratorFormModule
    ],
    exports: [
        CheckboxModule,
        PlayableWordSearchModule,
        WordSearchGeneratorFormModule
    ]
})
export class UIModule {
}
