import { LetterPlaceholder } from 'src/Rules/LetterPlaceholder/LetterPlaceholder';

export class ArrayGenerationService {
  public generateEmptyArray<T>(
    length: number,
    fillValue: T = LetterPlaceholder.value
  ): Array<T> {
    return new Array<T>(length).fill(fillValue);
  }

  public generateEmpty2dArray<T>(
    columns: number,
    rows: number,
    fillValue: T = LetterPlaceholder.value
  ): Array<Array<T>> {
    return new Array<T>(rows)
      .fill(fillValue)
      .map(() => new Array<T>(columns).fill(fillValue));
  }
}
