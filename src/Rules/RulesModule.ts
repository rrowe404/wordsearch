import { NgModule } from '@angular/core';
import { WordSearchGenerationModule } from './WordSearchGeneration/WordSearchGenerationModule';

@NgModule({
    imports: [
        WordSearchGenerationModule
    ],
    exports: [
        WordSearchGenerationModule
    ]
})
export class RulesModule {
}
