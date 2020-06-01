import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { LetterPlaceholderFillService } from 'src/Rules/LetterPlaceholder/LetterPlaceholderFillService';
import { Injectable } from '@angular/core';
import { WordSearchGenerationModule } from './WordSearchGenerationModule';
import { WordSearchStateFactory } from '../WordSearchState/WordSearchStateFactory';
import { LetterCasingService } from '../LetterCasing/LetterCasingService';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordValidationService } from '../WordValidation/WordValidationService';
import { RandomNumberGeneratorService } from '../RandomNumberGenerator/RandomNumberGeneratorService';
import { WordDirectionCheckerFactory } from '../WordDirection/WordDirectionCheckerFactory';
import { WordPlacementStrategyFactory } from '../WordPlacementStrategy/WordPlacementStrategyFactory';

@Injectable({
    providedIn: WordSearchGenerationModule
})
export class WordSearchGenerationService {
    constructor(
        private letterCasingService: LetterCasingService,
        private letterPlaceholderFillService: LetterPlaceholderFillService,
        private randomNumberGeneratorService: RandomNumberGeneratorService,
        private wordDirectionCheckerFactory: WordDirectionCheckerFactory,
        private wordPlacementStrategyFactory: WordPlacementStrategyFactory,
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

    /**
     * We'll try to randomly select a direction.
     * If that doesn't work, we'll randomly select another one.
     * If none of them work, there's a big problem.
     */
    private chooseDirection(currentState: WordSearchState, word: string) {
        let attemptedDirections = [];
        let directions = currentState.directions;

        do {
            let directionsLeftToAttempt = directions.filter(direction => !attemptedDirections.includes(direction));
            let directionToAttempt = this.randomNumberGeneratorService.getRandomValueFrom(directionsLeftToAttempt);
            let directionChecker = this.wordDirectionCheckerFactory.getDirectionChecker(directionToAttempt);

            if (directionChecker.checkDirection(currentState, word)) {
                return directionToAttempt;
            }

            attemptedDirections.push(directionToAttempt);
        } while (attemptedDirections.length < directions.length);

        throw new Error('You fucked up!');
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
        let direction = this.chooseDirection(currentState, word);
        let wordPlacementStrategy = this.wordPlacementStrategyFactory.createStrategy(direction);
        wordPlacementStrategy.placeWord(currentState, word);
    }
}
