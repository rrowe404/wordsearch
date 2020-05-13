import { WordValidator } from './WordValidator';
import { WordSearchGenerationOptions } from 'src/WordSearchGenerationOptions/WordSearchGenerationOptions';

export class WordLengthValidator implements WordValidator {
    validate(options: WordSearchGenerationOptions, word: string) {
        let tooWide = () => word.length > options.width;
        let tooTall = () => word.length > options.height;

        if (tooWide() || tooTall()) {
            return false;
        }

        return true;
    }
}