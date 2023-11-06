import { WordValidator } from './WordValidator';

export class NoBlankValidator implements WordValidator {
  getErrorKey() {
    return 'blanks';
  }

  getMessage() {
    return `No blanks allowed!`;
  }

  validate(options, word: string) {
    return word;
  }
}
