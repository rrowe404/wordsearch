import { NgModule } from '@angular/core';
import { WordSearchGenerationModule } from './WordSearchGeneration/WordSearchGenerationModule';
import { WordValidationModule } from './WordValidation/WordValidationModule';
import { WordBuilderModule } from './WordBuilder/WordBuilderModule';

@NgModule({
    imports: [
        WordBuilderModule,
        WordSearchGenerationModule,
        WordValidationModule
    ],
    exports: [
        WordBuilderModule,
        WordSearchGenerationModule,
        WordValidationModule
    ]
})
export class RulesModule {
}
