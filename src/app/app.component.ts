import { Component, OnInit } from '@angular/core';
import { WordSearchGenerationService } from 'src/Rules/WordSearchGeneration/WordSearchGenerationService';
import { WordSearchDifficulty } from 'src/Rules/WordSearchDifficulty/WordSearchDifficulty';
import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { DropdownOption } from 'src/UI/Dropdown/DropdownOption';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'wordsearch';

  constructor(
    private wordSearchGenerationService: WordSearchGenerationService
  ) {
  }

  public difficultyOptions: DropdownOption<WordSearchDifficulty>[] = [
    { value: WordSearchDifficulty.Easy, viewValue: 'Easy' },
    { value: WordSearchDifficulty.Medium, viewValue: 'Medium' },
    { value: WordSearchDifficulty.Hard, viewValue: 'Hard' }
  ];

  public difficulty: WordSearchDifficulty = WordSearchDifficulty.Easy;
  public inputFormGroup: FormGroup;

  public ngOnInit() {
    this.inputFormGroup = new FormGroup({});
  }

  public generate() {
    let options: WordSearchGenerationOptions = {
      height: 10,
      width: 10,
      words: this.getWordsFromForm()
    }

    let result = this.wordSearchGenerationService.generateWordSearch(options, this.difficulty);

    result.forEach(row => console.log(row));
  }

  public setDifficulty(difficulty: WordSearchDifficulty) {
    this.difficulty = difficulty;
  }

  private getWordsFromForm() {
    return Object.keys(this.inputFormGroup.controls).map(key => this.inputFormGroup.controls[key].value);
  }
}
