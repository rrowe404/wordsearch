import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { LetterPlaceholderFillService } from 'src/Rules/LetterPlaceholder/LetterPlaceholderFillService';
import { Injectable } from '@angular/core';
import { WordSearchGenerationModule } from './WordSearchGenerationModule';
import { WordSearchStateFactory } from '../WordSearchState/WordSearchStateFactory';
import { LetterCasingService } from '../LetterCasing/LetterCasingService';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordValidationService } from '../WordValidation/WordValidationService';
import { WordDirectionSelectorService } from '../WordDirection/WordDirectionSelectorService';
import { RandomNumberGeneratorService } from '../RandomNumberGenerator/RandomNumberGeneratorService';
import { WordPositionServiceFactory } from '../WordPosition/WordPositionServiceFactory';
import { StringUtils } from '../StringUtils/StringUtils';
import { WordOrientation } from '../WordOrientation/WordOrientation';
import { WordPosition } from '../WordPosition/WordPosition';

@Injectable({
    providedIn: WordSearchGenerationModule
})
export class WordSearchGenerationService {
    constructor(
        private letterCasingService: LetterCasingService,
        private letterPlaceholderFillService: LetterPlaceholderFillService,
        private randomNumberGeneratorService: RandomNumberGeneratorService,
        private stringUtils: StringUtils,
        private wordDirectionSelectorService: WordDirectionSelectorService,
        private wordPositionServiceFactory: WordPositionServiceFactory,
        private wordSearchStateFactory: WordSearchStateFactory,
        private wordValidationService: WordValidationService
    ) {
    }

    public generateWordSearch(options: WordSearchGenerationOptions) {
        let wordSearch = this.wordSearchStateFactory.createWordSearch(options);

        this.placeWords(wordSearch);

        this.letterPlaceholderFillService.fill(wordSearch);
        this.letterCasingService.case(wordSearch);

        return wordSearch;
    }

    private placeWords(currentState: WordSearchState) {
        currentState.words.forEach(word => {
            let place = !this.wordValidationService.hasErrors(currentState, word);

            if (place) {
                this.placeWord(currentState, word);
            } else {
                this.handleRejectedWord(currentState, word);
            }
        });

        return currentState;
    }

    private handleRejectedWord(currentState: WordSearchState, word: string) {
        let errors = this.wordValidationService.getErrors(currentState, word);

        // tslint:disable-next-line
        for (let error in errors) {
            console.log(errors[error]);
        }

        currentState.rejectWord(word);
    }

    private placeWord(currentState: WordSearchState, word: string) {
        let direction = this.wordDirectionSelectorService.selectDirection(currentState, word);
        let wordPositionService = this.wordPositionServiceFactory.getService(direction);

        // prevent reversed words from showing up reversed in word list
        let logWord = word;

        let orientation = this.randomNumberGeneratorService.getRandomValueFrom(currentState.orientations);

        if (orientation === WordOrientation.Backwards) {
            word = this.stringUtils.reverseWord(word);
        }

        let letters = word.split('');

        let validStartPositions = wordPositionService.getValidStartPositions(currentState, word);

        if (this.useZealousOverlapping(currentState)) {
            validStartPositions = this.getZealousOverlappingStartPositions(currentState, validStartPositions);
        }

        let startPosition = validStartPositions.length ? this.randomNumberGeneratorService.getRandomValueFrom(validStartPositions) : null;

        if (startPosition) {
            let length = letters.length;

            // place the letters into position
            for (let i = 0; i < length; i++) {
                let nextPosition = wordPositionService.getNextPosition(startPosition, i);
                currentState.setValueAt(nextPosition.row, nextPosition.column, letters[i]);
            }

            currentState.acceptWord(logWord);
        } else {
            currentState.rejectWord(logWord);
        }

        return currentState;
    }

    private useZealousOverlapping(currentState: WordSearchState) {
        return currentState.zealousOverlaps;
    }

    private getZealousOverlappingStartPositions(currentState: WordSearchState, validStartPositions: WordPosition[]) {
        let overlappingStartPositions = validStartPositions.filter(p => p.hasOverlaps);

        if (overlappingStartPositions.length) {
            validStartPositions = overlappingStartPositions;
        }

        return validStartPositions;
    }
}
