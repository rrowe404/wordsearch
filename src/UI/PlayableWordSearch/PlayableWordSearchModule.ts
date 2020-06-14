import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayableWordSearchComponent } from './PlayableWordSearchComponent';
import { ArrayGenerationModule } from 'src/Rules/ArrayGeneration/ArrayGenerationModule';

@NgModule({
    imports: [
        ArrayGenerationModule,
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
