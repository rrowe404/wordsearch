import { NgModule } from "@angular/core";
import { DropdownModule } from "./Dropdown/DropdownModule";
import { InputModule } from "./Input/InputModule";
import { InputListModule } from './InputList/InputListModule';
import { ButtonModule } from './Button/ButtonModule';
import { CheckboxModule } from './Checkbox/CheckboxModule';

@NgModule({
    imports: [
        ButtonModule,
        CheckboxModule,
        DropdownModule,
        InputModule,
        InputListModule
    ],
    exports: [
        ButtonModule,
        CheckboxModule,
        DropdownModule,
        InputModule,
        InputListModule
    ]
})
export class UIModule {
}