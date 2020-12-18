import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropdownComponent } from './DropdownComponent';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DropdownComponent
    ],
    entryComponents: [
        DropdownComponent
    ],
    exports: [
        DropdownComponent
    ]
})
export class DropdownModule {
}
