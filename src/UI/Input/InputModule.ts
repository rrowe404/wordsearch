import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './InputComponent';

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
    ],
    declarations: [
        InputComponent
    ],
    entryComponents: [
        InputComponent
    ],
    exports: [
        InputComponent
    ]
})
export class InputModule {
}