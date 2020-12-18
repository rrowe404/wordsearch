import { NgModule } from '@angular/core';
import { DropdownModule } from './Dropdown/DropdownModule';
import { CheckboxModule } from './Checkbox/CheckboxModule';
import { WordSearchGeneratorFormModule } from './WordSearchGeneratorForm/WordSearchGeneratorFormModule';
import { PlayableWordSearchModule } from './PlayableWordSearch/PlayableWordSearchModule';

@NgModule({
    imports: [
        CheckboxModule,
        DropdownModule,
        PlayableWordSearchModule,
        WordSearchGeneratorFormModule
    ],
    exports: [
        CheckboxModule,
        DropdownModule,
        PlayableWordSearchModule,
        WordSearchGeneratorFormModule
    ]
})
export class UIModule {
}
