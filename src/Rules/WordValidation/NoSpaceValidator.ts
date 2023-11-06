import { WordValidator } from './WordValidator';

export class NoSpaceValidator implements WordValidator {
  getErrorKey() {
    return 'spaces';
  }

  getMessage() {
    return `No spaces allowed!`;
  }

  validate(options, word: string) {
    return word.indexOf(' ') === -1;
  }
}
