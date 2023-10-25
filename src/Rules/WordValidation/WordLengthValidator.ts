import { WordValidator } from './WordValidator';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordSearchGenerationOptions } from '../WordSearchGenerationOptions/WordSearchGenerationOptions';

export class WordLengthValidator implements WordValidator {
  getErrorKey() {
    return 'length';
  }

  getMessage(word: string) {
    return `${word} is longer than both the height and width!`;
  }

  validate(options: WordSearchGenerationOptions, word: string) {
    let tooWide = () => word.length > options.width;
    let tooTall = () => word.length > options.height;

    if (tooWide() && tooTall()) {
      return false;
    }

    return true;
  }
}
