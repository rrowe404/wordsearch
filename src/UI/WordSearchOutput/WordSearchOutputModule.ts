import { NgModule } from '@angular/core';
import { CanvasUtilsModule } from '../CanvasUtils/CanvasUtilsModule';
import { HTMLUtilsModule } from '../HTMLUtils/HTMLUtilsModule';
import { PlayableEventModule } from '../PlayableEvent/PlayableEventModule';

@NgModule({
    imports: [
        CanvasUtilsModule,
        HTMLUtilsModule,
        PlayableEventModule
    ]
})
export class WordSearchOutputModule {

}
