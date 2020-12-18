import { NgModule } from '@angular/core';
import { DropdownModule } from './Dropdown/DropdownModule';
import { ButtonModule } from './Button/ButtonModule';
import { CheckboxModule } from './Checkbox/CheckboxModule';
import { WordSearchGeneratorFormModule } from './WordSearchGeneratorForm/WordSearchGeneratorFormModule';
import { CardModule } from './Card/CardModule';
import { PlayableWordSearchModule } from './PlayableWordSearch/PlayableWordSearchModule';

@NgModule({
    imports: [
        ButtonModule,
        CardModule,
        CheckboxModule,
        DropdownModule,
        PlayableWordSearchModule,
        WordSearchGeneratorFormModule
    ],
    exports: [
        ButtonModule,
        CardModule,
        CheckboxModule,
        DropdownModule,
        PlayableWordSearchModule,
        WordSearchGeneratorFormModule
    ]
})
export class UIModule {
}
