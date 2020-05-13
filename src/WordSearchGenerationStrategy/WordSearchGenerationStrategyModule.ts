import { NgModule } from '@angular/core';
import { WordPlacementStrategyModule } from 'src/WordPlacementStrategy/WordPlacementStrategyModule';
import { WordValidationModule } from 'src/WordValidation/WordValidationModule';

@NgModule({
    imports: [
        WordPlacementStrategyModule,
        WordValidationModule
    ]
})
export class WordSearchGenerationStrategyModule {
}