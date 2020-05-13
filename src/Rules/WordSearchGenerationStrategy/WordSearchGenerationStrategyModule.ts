import { NgModule } from '@angular/core';
import { WordPlacementStrategyModule } from 'src/Rules/WordPlacementStrategy/WordPlacementStrategyModule';
import { WordValidationModule } from 'src/Rules/WordValidation/WordValidationModule';

@NgModule({
    imports: [
        WordPlacementStrategyModule,
        WordValidationModule
    ]
})
export class WordSearchGenerationStrategyModule {
}