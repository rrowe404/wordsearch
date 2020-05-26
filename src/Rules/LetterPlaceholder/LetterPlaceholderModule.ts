import { NgModule } from '@angular/core';
import { RandomNumberGeneratorModule } from 'src/Rules/RandomNumberGenerator/RandomNumberGeneratorModule';
import { WordSearchStateSlicerModule } from '../WordSearchStateSlicer/WordSearchStateSlicerModule';

@NgModule({
    imports: [
        RandomNumberGeneratorModule,
        WordSearchStateSlicerModule
    ]
})
export class LetterPlaceholderModule {
}