import { NgModule } from '@angular/core';
import { ArrayGenerationModule } from './ArrayGeneration/ArrayGenerationModule';
import { WordSearchGenerationModule } from './WordSearchGeneration/WordSearchGenerationModule';
import { WordSearchStateModule } from './WordSearchState/WordSearchStateModule';
import { WordValidationModule } from './WordValidation/WordValidationModule';
import { WordBuilderModule } from './WordBuilder/WordBuilderModule';

@NgModule({
    imports: [
        ArrayGenerationModule,
        WordBuilderModule,
        WordSearchGenerationModule,
        WordSearchStateModule,
        WordValidationModule
    ],
    exports: [
        ArrayGenerationModule,
        WordBuilderModule,
        WordSearchGenerationModule,
        WordSearchStateModule,
        WordValidationModule
    ]
})
export class RulesModule {
}
