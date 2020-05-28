import { NgModule } from '@angular/core';
import { RandomNumberGeneratorModule } from 'src/Rules/RandomNumberGenerator/RandomNumberGeneratorModule';
import { ProfanityFilterModule } from '../ProfanityFilter/ProfanityFilterModule';

@NgModule({
    imports: [
        ProfanityFilterModule,
        RandomNumberGeneratorModule,
    ]
})
export class LetterPlaceholderModule {
}
