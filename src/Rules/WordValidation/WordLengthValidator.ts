import { WordValidator } from './WordValidator';
import { WordSearchGenerationOptions } from '../WordSearchGenerationOptions/WordSearchGenerationOptions';

export class WordLengthValidator implements WordValidator {
  getErrorKey() {
    return 'length';
  }

  getMessage(word: string) {
    return `${word} is longer than both the height and width!`;
  }

  validate(options: WordSearchGenerationOptions, word: string) {
    const tooWide = () => word.length > options.width;
    const tooTall = () => word.length > options.height;

    if (tooWide() && tooTall()) {
      return false;
    }

    return true;
  }
}
