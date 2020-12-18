import { NgModule } from '@angular/core';
import { WordSearchGeneratorFormComponent } from './WordSearchGeneratorFormComponent';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from '../Checkbox/CheckboxModule';
import { WordSearchOutputModule } from 'src/UI/WordSearchOutput/WordSearchOutputModule';
import { PlayableWordSearchModule } from '../PlayableWordSearch/PlayableWordSearchModule';

@NgModule({
    imports: [
        CommonModule,
        CheckboxModule,
        PlayableWordSearchModule,
        WordSearchOutputModule
    ],
    declarations: [
        WordSearchGeneratorFormComponent,
    ],
    entryComponents: [
        WordSearchGeneratorFormComponent
    ],
    exports: [
        WordSearchGeneratorFormComponent
    ]
})
export class WordSearchGeneratorFormModule {
}
