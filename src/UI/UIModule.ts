import { NgModule } from "@angular/core";
import { DropdownModule } from "./Dropdown/DropdownModule";
import { InputModule } from "./Input/InputModule";

@NgModule({
    imports: [
        DropdownModule,
        InputModule
    ],
    exports: [
        DropdownModule,
        InputModule
    ]
})
export class UIModule {
}