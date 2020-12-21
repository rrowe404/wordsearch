import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayableWordSearchComponent } from './PlayableWordSearchComponent';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PlayableWordSearchComponent
    ],
    entryComponents: [
        PlayableWordSearchComponent
    ],
    exports: [
        PlayableWordSearchComponent
    ]
})
export class PlayableWordSearchModule {
}
