import { LetterPlaceholder } from './LetterPlaceholder';
import { Injectable } from '@angular/core';
import { RandomNumberGeneratorService } from 'src/Rules/RandomNumberGenerator/RandomNumberGeneratorService';
import { LetterPlaceholderModule } from './LetterPlaceholderModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';

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
        private randomNumberGeneratorService: RandomNumberGeneratorService
    ) {}

    public fill(currentState: WordSearchState) {
        // currentState.forEach((row, i) => {
        //     row.forEach((value, j) => {
        //         if (value === LetterPlaceholder.value) {
        //             let fillLetter = this.alphabet[this.randomNumberGeneratorService.generateRandomIntWithMax(this.alphabet.length)];
        //             currentState[i][j] = fillLetter;
        //         }
        //     })
        // });

        return currentState;
    }
}
