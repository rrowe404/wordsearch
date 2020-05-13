import { NgModule } from "@angular/core";
import { DropdownModule } from "./Dropdown/DropdownModule";

@NgModule({
    imports: [
        DropdownModule
    ],
    exports: [
        DropdownModule
    ]
})
export class UIModule {
}