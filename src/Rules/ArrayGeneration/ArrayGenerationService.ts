import { LetterPlaceholder } from 'src/Rules/LetterPlaceholder/LetterPlaceholder';

export class ArrayGenerationService {
    public generateEmptyArray(length: number, fillValue: any = LetterPlaceholder.value) {
        return new Array(length).fill(fillValue);
    }

    public generateEmpty2dArray(columns: number, rows: number, fillValue: LetterPlaceholder = LetterPlaceholder.value) {
        return new Array(rows).fill(fillValue).map(() => new Array(columns).fill(fillValue));
    }
}
