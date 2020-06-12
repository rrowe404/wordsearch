import { NgModule } from '@angular/core';
import { VALIDATORS } from './VALIDATORS';
import { NoSpaceValidator } from './NoSpaceValidator';
import { WordLengthValidator } from './WordLengthValidator';

@NgModule({
    providers: [
        { provide: VALIDATORS, useClass: NoSpaceValidator, multi: true },
        { provide: VALIDATORS, useClass: WordLengthValidator, multi: true }
    ]
})
export class WordValidationModule {
}

