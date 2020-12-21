import { LetterPlaceholder } from './LetterPlaceholder';
import { RandomNumberGeneratorService } from 'src/Rules/RandomNumberGenerator/RandomNumberGeneratorService';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { LetterWithPosition } from '../LetterWithPosition/LetterWithPosition';
import { ProfanityFilterService } from '../ProfanityFilter/ProfanityFilterService';

export class LetterPlaceholderFillService {
    private randomNumberGeneratorService = new RandomNumberGeneratorService();
    private profanityFilterService = new ProfanityFilterService();

    private alphabet = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
        'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
        'w', 'x', 'y', 'z'
    ];

    public fill(currentState: WordSearchState) {
        let userPlacedLetters: LetterWithPosition[] = [];

        currentState.iterate((letter, row, column) => {
            if (letter === LetterPlaceholder.value) {
                let fillLetter = this.getFillLetter();
                currentState.setValueAt(row, column, fillLetter);
            } else {
                userPlacedLetters.push({ letter, row, column });
            }
        });

        if (currentState.filterAccidentalProfanity) {
            let changesMade = true;

            // need to keep doing this until no profanity is left
            while (changesMade) {
                changesMade = this.profanityFilterService.filterProfanity(currentState, userPlacedLetters);

                if (changesMade) {
                    // then iterate and fill again
                    currentState.iterate((letter, row, column) => {
                        if (letter === LetterPlaceholder.value) {
                            let fillLetter = this.getFillLetter();
                            currentState.setValueAt(row, column, fillLetter);
                        }
                    });
                }
            }
        }

        return currentState;
    }

    private getFillLetter() {
        return this.randomNumberGeneratorService.getRandomValueFrom(this.alphabet);
    }
}
