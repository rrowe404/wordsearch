import { Component } from '@angular/core';
import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';
import { WordSearchGenerationService } from 'src/Rules/WordSearchGeneration/WordSearchGenerationService';
import { WordSearchStateFactory } from 'src/Rules/WordSearchState/WordSearchStateFactory';
import { WordValidationService } from 'src/Rules/WordValidation/WordValidationService';
import { WordSearchDifficulty } from 'src/Rules/WordSearchDifficulty/WordSearchDifficulty';
import { DropdownOption } from '../Dropdown/DropdownOption';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';

@Component({
    selector: 'word-search-generator-form',
    styleUrls: ['./WordSearchGeneratorFormComponent.less'],
    templateUrl: './WordSearchGeneratorFormComponent.html'
})
export class WordSearchGeneratorFormComponent {
    constructor(
        private wordSearchGenerationService: WordSearchGenerationService,
        private wordSearchStateFactory: WordSearchStateFactory,
        private wordValidationService: WordValidationService
      ) {
      }
    
      public difficultyOptions: DropdownOption<WordSearchDifficulty>[] = [
        { value: WordSearchDifficulty.Easy, viewValue: 'Easy' },
        { value: WordSearchDifficulty.Medium, viewValue: 'Medium' },
        { value: WordSearchDifficulty.Hard, viewValue: 'Hard' }
      ];
    
      public difficulty: WordSearchDifficulty = WordSearchDifficulty.Easy;
      public gameFormGroup: FormGroup;
      public wordFormGroup: FormGroup;
    
      /** We need a WordSearchState in order to validate the words as they are typed.
       *  This one will not actually be used to compute the final result.
       *  Changes to generationOptions should be immediately reflected in dummyState. */
      public dummyState: WordSearchState;
    
      public generationOptions: WordSearchGenerationOptions = {
        height: 3,
        width: 3,
        alphabetizeWordList: false,
        showWordList: true,
        title: '',
        words: [],
        filterAccidentalProfanity: false
      }
    
      public wordValidators: ValidatorFn[];
    
      public ngOnInit() {
        this.dummyState = this.wordSearchStateFactory.createWordSearch(this.generationOptions);
    
        this.wordValidators = [
          (control: AbstractControl) => {
            return this.wordValidationService.getErrors(this.dummyState, control.value);
          }
        ]
    
        this.gameFormGroup = new FormGroup({});
        this.wordFormGroup = new FormGroup({});
        this.gameFormGroup.addControl('word', this.wordFormGroup);
      }
    
      public generate() {
        this.generationOptions.words = this.getWordsFromForm();
    
        let result = this.wordSearchGenerationService.generateWordSearch(this.generationOptions, this.difficulty);
    
        result.print();
      }
    
      public setDifficulty(difficulty: WordSearchDifficulty) {
        this.difficulty = difficulty;
      }
    
      private getWordsFromForm() {
        return Object.keys(this.wordFormGroup.controls).map(key => this.wordFormGroup.controls[key].value);
      }
    
      public setColumns(columns: string) {
        this.generationOptions.width = parseInt(columns, 10);
      }
    
      public setRows(rows: string) {
        this.generationOptions.height = parseInt(rows, 10);
      }
    
      public setTitle(title: string) {
        this.generationOptions.title = title;
      }
    
      public setShowWordList(showWordList: boolean) {
        this.generationOptions.showWordList = showWordList;
      }
    
      public setAlphabetizeWordList(alphabetizeWordList: boolean) {
        this.generationOptions.alphabetizeWordList = alphabetizeWordList;
      }
    
      public setFilterProfanity(filterProfanity: boolean) {
        this.generationOptions.filterAccidentalProfanity = filterProfanity;
      }
}