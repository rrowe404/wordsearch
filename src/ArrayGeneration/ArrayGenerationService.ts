import { Injectable } from '@angular/core';
import { LetterPlaceholder } from 'src/LetterPlaceholder/LetterPlaceholder';

@Injectable({
    providedIn: 'root'
})
export class ArrayGenerationService {
    public generateEmpty2dArray(columns: number, rows: number, fillValue: LetterPlaceholder = LetterPlaceholder.value) {
        return new Array(rows).fill(fillValue).map(() => new Array(columns).fill(fillValue));
    }
}