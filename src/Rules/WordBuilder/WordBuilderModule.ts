import { NgModule } from '@angular/core';
import { StringUtilsModule } from '../StringUtils/StringUtilsModule';
import { WORD_BUILDERS } from './WORD_BUILDERS';
import { HorizontalWordBuilder } from './HorizontalWordBuilder';
import { VerticalWordBuilder } from './VerticalWordBuilder';
import { DiagonalWordBuilder } from './DiagonalWordBuilder';

@NgModule({
    imports: [
        StringUtilsModule
    ],
    providers: [
        { provide: WORD_BUILDERS, useClass: HorizontalWordBuilder, multi: true },
        { provide: WORD_BUILDERS, useClass: VerticalWordBuilder, multi: true },
        { provide: WORD_BUILDERS, useClass: DiagonalWordBuilder, multi: true }
    ]
})
export class WordBuilderModule {
}
