import { NgModule } from '@angular/core';
import { RandomNumberGeneratorModule } from '../RandomNumberGenerator/RandomNumberGeneratorModule';
import { StringUtilsModule } from '../StringUtils/StringUtilsModule';

@NgModule({
    imports: [
        RandomNumberGeneratorModule,
        StringUtilsModule
    ]
})
export class WordPositionModule {
}
