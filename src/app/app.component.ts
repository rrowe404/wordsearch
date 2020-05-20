import { Component, OnInit } from '@angular/core';
import { WordSearchGenerationService } from 'src/Rules/WordSearchGeneration/WordSearchGenerationService';
import { WordSearchDifficulty } from 'src/Rules/WordSearchDifficulty/WordSearchDifficulty';
import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { DropdownOption } from 'src/UI/Dropdown/DropdownOption';
import { FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { WordSearchStateFactory } from 'src/Rules/WordSearchState/WordSearchStateFactory';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { WordValidationService } from 'src/Rules/WordValidation/WordValidationService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'wordsearch';

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
    words: []
  }

  public wordValidators: ValidatorFn[];

  public ngOnInit() {
    this.dummyState = this.wordSearchStateFactory.createWordSearch(this.generationOptions);

    this.wordValidators = [
      (control: AbstractControl) => {
        return this.wordValidationService.getErrors(this.dummyState, control.value);
      }
    ]

    this.wordFormGroup = new FormGroup({});
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
}
