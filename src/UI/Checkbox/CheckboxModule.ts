import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CheckboxComponent } from './CheckboxComponent';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        MatCheckboxModule,
        ReactiveFormsModule
    ],
    declarations: [
        CheckboxComponent
    ],
    entryComponents: [
        CheckboxComponent
    ],
    exports: [
        CheckboxComponent
    ]
})
export class CheckboxModule {
}
