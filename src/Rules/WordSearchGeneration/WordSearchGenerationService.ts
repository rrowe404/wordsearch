import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { LetterPlaceholderFillService } from 'src/Rules/LetterPlaceholder/LetterPlaceholderFillService';
import { Injectable } from '@angular/core';
import { WordSearchGenerationModule } from './WordSearchGenerationModule';
import { WordSearchStateFactory } from '../WordSearchState/WordSearchStateFactory';
import { LetterCasingService } from '../LetterCasing/LetterCasingService';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordValidationService } from '../WordValidation/WordValidationService';
import { WordPlacementStrategyFactory } from '../WordPlacementStrategy/WordPlacementStrategyFactory';
import { WordDirectionSelectorService } from '../WordDirection/WordDirectionSelectorService';

@Injectable({
    providedIn: WordSearchGenerationModule
})
export class WordSearchGenerationService {
    constructor(
        private letterCasingService: LetterCasingService,
        private letterPlaceholderFillService: LetterPlaceholderFillService,
        private wordDirectionSelectorService: WordDirectionSelectorService,
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
        let wordPlacementStrategy = this.wordPlacementStrategyFactory.createStrategy(direction);
        wordPlacementStrategy.placeWord(currentState, word);
    }
}
