import { NgModule } from '@angular/core';
import { CardComponent } from './CardComponent';

@NgModule({
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
