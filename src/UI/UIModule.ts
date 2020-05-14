import { NgModule } from "@angular/core";
import { DropdownModule } from "./Dropdown/DropdownModule";
import { InputModule } from "./Input/InputModule";
import { InputListModule } from './InputList/InputListModule';
import { ButtonModule } from './Button/ButtonModule';

@NgModule({
    imports: [
        ButtonModule,
        DropdownModule,
        InputModule,
        InputListModule
    ],
    exports: [
        ButtonModule,
        DropdownModule,
        InputModule,
        InputListModule
    ]
})
export class UIModule {
}