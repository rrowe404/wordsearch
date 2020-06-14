import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayableWordSearchComponent } from './PlayableWordSearchComponent';
import { ArrayGenerationModule } from 'src/Rules/ArrayGeneration/ArrayGenerationModule';
import { WordBuilderModule } from 'src/Rules/WordBuilder/WordBuilderModule';

@NgModule({
    imports: [
        ArrayGenerationModule,
        CommonModule,
        WordBuilderModule
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
