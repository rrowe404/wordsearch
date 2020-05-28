import { NgModule } from '@angular/core';
import { InputModule } from '../Input/InputModule';
import { InputListComponent } from './InputListComponent';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../Button/ButtonModule';
import { IconButtonModule } from '../IconButton/IconButtonModule';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        InputModule,
        IconButtonModule
    ],
    declarations: [
        InputListComponent
    ],
    entryComponents: [
        InputListComponent
    ],
    exports: [
        InputListComponent
    ]
})
export class InputListModule {
}
