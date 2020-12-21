import { NgModule } from '@angular/core';
import { WordSearchGenerationModule } from './WordSearchGeneration/WordSearchGenerationModule';
import { WordBuilderModule } from './WordBuilder/WordBuilderModule';

@NgModule({
    imports: [
        WordBuilderModule,
        WordSearchGenerationModule
    ],
    exports: [
        WordBuilderModule,
        WordSearchGenerationModule
    ]
})
export class RulesModule {
}
