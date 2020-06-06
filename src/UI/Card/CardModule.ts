import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from './CardComponent';

@NgModule({
    imports: [
        MatCardModule
    ],
    declarations: [
        CardComponent,
    ],
    entryComponents: [
        CardComponent
    ],
    exports: [
        CardComponent
    ]
})
export class CardModule {
}
