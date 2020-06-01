import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl } from '@angular/forms';

/**
 * Considers only whether the value is valid or not, not
 * so any errors will show up even if the input is seeded
 */
export class InvalidErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl): boolean {
        return control && control.invalid;
    }
}
