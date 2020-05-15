import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IconButtonComponent } from './IconButtonComponent';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule
    ],
    declarations: [
        IconButtonComponent
    ],
    entryComponents: [
        IconButtonComponent
    ],
    exports: [
        IconButtonComponent
    ]
})
export class IconButtonModule {
}