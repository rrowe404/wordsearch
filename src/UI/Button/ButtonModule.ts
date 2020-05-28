import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from './ButtonComponent';

@NgModule({
    imports: [
        MatButtonModule
    ],
    declarations: [
        ButtonComponent
    ],
    entryComponents: [
        ButtonComponent
    ],
    exports: [
        ButtonComponent
    ]
})
export class ButtonModule {
}
