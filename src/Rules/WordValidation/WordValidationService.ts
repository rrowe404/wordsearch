import { WordValidator } from './WordValidator';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { NoSpaceValidator } from './NoSpaceValidator';
import { WordLengthValidator } from './WordLengthValidator';
import { NoBlankValidator } from './NoBlankValidator';
import { WordSearchGenerationOptions } from '../WordSearchGenerationOptions/WordSearchGenerationOptions';

export class WordValidationService {
  private validators: WordValidator[] = [
    new NoBlankValidator(),
    new NoSpaceValidator(),
    new WordLengthValidator(),
  ];

  public getError(
    options: WordSearchGenerationOptions,
    word: string
  ): string | null {
    let violatedValidator = this.validators.find(
      (validator) => !validator.validate(options, word)
    );

    return violatedValidator?.getMessage(word);
  }

  public hasErrors(
    options: WordSearchGenerationOptions,
    word: string
  ): boolean {
    return !!this.getError(options, word);
  }
}
