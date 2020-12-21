import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlayableWordSearchComponent } from './PlayableWordSearchComponent';
import { WordBuilderModule } from 'src/Rules/WordBuilder/WordBuilderModule';

@NgModule({
    imports: [
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
