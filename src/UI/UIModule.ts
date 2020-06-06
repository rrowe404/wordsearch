import { NgModule } from '@angular/core';
import { DropdownModule } from './Dropdown/DropdownModule';
import { InputModule } from './Input/InputModule';
import { InputListModule } from './InputList/InputListModule';
import { ButtonModule } from './Button/ButtonModule';
import { CheckboxModule } from './Checkbox/CheckboxModule';
import { WordSearchGeneratorFormModule } from './WordSearchGeneratorForm/WordSearchGeneratorFormModule';
import { CardModule } from './Card/CardModule';

@NgModule({
    imports: [
        ButtonModule,
        CardModule,
        CheckboxModule,
        DropdownModule,
        InputModule,
        InputListModule,
        WordSearchGeneratorFormModule
    ],
    exports: [
        ButtonModule,
        CardModule,
        CheckboxModule,
        DropdownModule,
        InputModule,
        InputListModule,
        WordSearchGeneratorFormModule
    ]
})
export class UIModule {
}
