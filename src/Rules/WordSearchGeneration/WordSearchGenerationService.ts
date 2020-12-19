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
import { WordPositionServiceBase } from '../WordPosition/WordPositionServiceBase';
import { WordStartParameters } from '../WordStartParameters/WordStartParameters';

@Injectable({
    providedIn: WordSearchGenerationModule
})
export class WordSearchGenerationService {
    private letterCasingService = new LetterCasingService();
    private randomNumberGeneratorService = new RandomNumberGeneratorService();

    constructor(
        private letterPlaceholderFillService: LetterPlaceholderFillService,
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
        // prevent reversed words from showing up reversed in word list
        let logWord = word;

        let orientation = this.randomNumberGeneratorService.getRandomValueFrom(currentState.orientations);

        if (orientation === WordOrientation.Backwards) {
            word = this.stringUtils.reverseWord(word);
        }

        let startParams = this.getStartParameters(currentState, word);

        if (startParams && startParams.startPosition) {
            this.placeLetters(currentState, word, startParams);
            currentState.acceptWord(logWord);
        } else {
            currentState.rejectWord(logWord);
        }

        return currentState;
    }

    /**
     * determine start position.
     * try one randomly selected direction at a time.
     * if no valid start positions exist, try another direction.
     * if zealous overlapping is on, we'll first try to find start positions with overlaps.
     * if there are none in any direction, then do it again without.
     */
    private getStartParameters(currentState: WordSearchState, word: string): WordStartParameters {
        let validDirections = this.wordDirectionSelectorService.selectDirections(currentState, word);
        let attemptedDirections = [];

        let startPosition = null;
        let positionService: WordPositionServiceBase;
        let zealousOverlaps = currentState.zealousOverlaps;

        do {
            let directionsLeftToAttempt = validDirections.filter(d => !attemptedDirections.includes(d));
            let direction = this.randomNumberGeneratorService.getRandomValueFrom(directionsLeftToAttempt);

            positionService = this.wordPositionServiceFactory.getService(direction);
            let validStartPositions = positionService.getValidStartPositions(currentState, word);

            if (zealousOverlaps) {
                validStartPositions = this.getZealousOverlappingStartPositions(validStartPositions);
            }

            if (validStartPositions.length) {
                startPosition = this.randomNumberGeneratorService.getRandomValueFrom(validStartPositions);

                return {
                    startPosition,
                    positionService
                };
            }

            attemptedDirections.push(direction);

            if (zealousOverlaps && attemptedDirections.length === validDirections.length && !startPosition) {
                zealousOverlaps = false;
                attemptedDirections = [];
            }
        } while (attemptedDirections.length < validDirections.length);

        return null;
    }

    private getZealousOverlappingStartPositions(validStartPositions: WordPosition[]) {
        let overlappingStartPositions = validStartPositions.filter(p => p.hasOverlaps);

        return overlappingStartPositions;
    }

    private placeLetters(currentState: WordSearchState, word: string, startParams: WordStartParameters) {
        let letters = word.split('');
        let length = letters.length;

        // place the letters into position
        for (let i = 0; i < length; i++) {
            let nextPosition = startParams.positionService.getNextPosition(startParams.startPosition, i);
            currentState.setValueAt(nextPosition.row, nextPosition.column, letters[i]);
        }
    }
}
