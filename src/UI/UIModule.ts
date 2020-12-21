import { NgModule } from '@angular/core';
import { PlayableWordSearchModule } from './PlayableWordSearch/PlayableWordSearchModule';

@NgModule({
    imports: [
        PlayableWordSearchModule
    ],
    exports: [
        PlayableWordSearchModule
    ]
})
export class UIModule {
}
