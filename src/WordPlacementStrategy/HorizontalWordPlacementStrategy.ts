import { RandomNumberGeneratorService } from 'src/RandomNumberGenerator/RandomNumberGeneratorService';
import { LetterPlaceholder } from 'src/LetterPlaceholder/LetterPlaceholder';
import { WordPlacementStrategy } from './WordPlacementStrategy';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HorizontalWordPlacementStrategy implements WordPlacementStrategy {
    constructor(
        private randomNumberGeneratorService: RandomNumberGeneratorService
    ) {
    }

    placeWord(currentState: string[][], word: string) {
        let letters = word.split('');

        let columns = currentState[0].length;
        let rows = currentState.length;

        // choose a random starting location
        let getStartColumn = () => this.randomNumberGeneratorService.generateRandomIntInRange(columns);

        // must allow enough room for the word
        let getStartRow = () => this.randomNumberGeneratorService.generateRandomIntInRange(rows - word.length);

        let startColumn = getStartColumn();
        let startRow = getStartRow();;

        let positioned = false;
        let attempts = 0;
        let maxAttempts = 5;

        while (!positioned) {
            // check to see if there is enough room. loop until we've found a suitable starting point
            let length = letters.length;

            for (let i = 0; i < length; i++) {
                let valueAtPosition = currentState[startColumn][startRow + i];

                positioned = valueAtPosition === LetterPlaceholder.value;
            }

            if (positioned) {
                break;
            } else {
                startColumn = getStartColumn();
                startRow = getStartRow();
                attempts++;

                if (attempts > maxAttempts) {
                    console.log('you fucked up somehow. freeing you from infinite loop...');
                    break;
                }
            }
        }

        if (positioned) {
            let length = letters.length;

            // place the letters into position
            for (let i = 0; i < length; i++) {
                currentState[startColumn][startRow + i] = letters[i];
            }
        }

        return currentState;
    }
}