import { NgModule } from '@angular/core';
import { DropdownModule } from './Dropdown/DropdownModule';
import { CheckboxModule } from './Checkbox/CheckboxModule';
import { WordSearchGeneratorFormModule } from './WordSearchGeneratorForm/WordSearchGeneratorFormModule';
import { CardModule } from './Card/CardModule';
import { PlayableWordSearchModule } from './PlayableWordSearch/PlayableWordSearchModule';

@NgModule({
    imports: [
        CardModule,
        CheckboxModule,
        DropdownModule,
        PlayableWordSearchModule,
        WordSearchGeneratorFormModule
    ],
    exports: [
        CardModule,
        CheckboxModule,
        DropdownModule,
        PlayableWordSearchModule,
        WordSearchGeneratorFormModule
    ]
})
export class UIModule {
}
