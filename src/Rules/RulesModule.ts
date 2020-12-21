import { NgModule } from '@angular/core';
import { ArrayGenerationModule } from './ArrayGeneration/ArrayGenerationModule';
import { WordSearchGenerationModule } from './WordSearchGeneration/WordSearchGenerationModule';
import { WordSearchStateModule } from './WordSearchState/WordSearchStateModule';
import { WordValidationModule } from './WordValidation/WordValidationModule';
import { WordPositionModule } from './WordPosition/WordPositionModule';
import { WordBuilderModule } from './WordBuilder/WordBuilderModule';

@NgModule({
    imports: [
        ArrayGenerationModule,
        WordBuilderModule,
        WordPositionModule,
        WordSearchGenerationModule,
        WordSearchStateModule,
        WordValidationModule
    ],
    exports: [
        ArrayGenerationModule,
        WordBuilderModule,
        WordPositionModule,
        WordSearchGenerationModule,
        WordSearchStateModule,
        WordValidationModule
    ]
})
export class RulesModule {
}
