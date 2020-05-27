import { LetterPlaceholder } from './LetterPlaceholder';
import { Injectable } from '@angular/core';
import { RandomNumberGeneratorService } from 'src/Rules/RandomNumberGenerator/RandomNumberGeneratorService';
import { LetterPlaceholderModule } from './LetterPlaceholderModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { LetterWithPosition } from '../LetterWithPosition/LetterWithPosition';
import { ProfanityFilterService } from '../ProfanityFilter/ProfanityFilterService';

@Injectable({
    providedIn: LetterPlaceholderModule
})
export class LetterPlaceholderFillService {
    private alphabet = [
        'a','b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
        'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
        'w', 'x', 'y', 'z'
    ];

    constructor(
        private profanityFilterService: ProfanityFilterService,
        private randomNumberGeneratorService: RandomNumberGeneratorService
    ) {}

    public fill(currentState: WordSearchState) {
        let userPlacedLetters: LetterWithPosition[] = [];

        currentState.iterate((letter, row, column) => {
            if (letter === LetterPlaceholder.value) {
                let fillLetter = this.alphabet[this.randomNumberGeneratorService.generateRandomIntWithMax(this.alphabet.length)];
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
                            let fillLetter = this.alphabet[this.randomNumberGeneratorService.generateRandomIntWithMax(this.alphabet.length)];
                            currentState.setValueAt(row, column, fillLetter);
                        } 
                    });
                }
            }
        }

        return currentState;
    }
}
