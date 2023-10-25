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

  public getErrors(options: WordSearchGenerationOptions, word: string) {
    // if one fails we won't bother with the rest -- it's just clutter until the original error has been fixed imo

    let violatedValidator = this.validators.find(
      (validator) => !validator.validate(options, word)
    );

    let errors = {};

    if (violatedValidator) {
      errors[violatedValidator.getErrorKey()] =
        violatedValidator.getMessage(word);
    }

    return errors;
  }

  public hasErrors(options: WordSearchGenerationOptions, word: string) {
    return Object.keys(this.getErrors(options, word)).length !== 0;
  }
}
