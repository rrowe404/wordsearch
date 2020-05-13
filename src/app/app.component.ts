import { Component, OnInit } from '@angular/core';
import { WordSearchGenerationService } from 'src/Rules/WordSearchGeneration/WordSearchGenerationService';
import { WordSearchDifficulty } from 'src/Rules/WordSearchDifficulty/WordSearchDifficulty';
import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { DropdownOption } from 'src/UI/Dropdown/DropdownOption';

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

  public ngOnInit() {
    let options: WordSearchGenerationOptions = {
      height: 10,
      width: 10,
      words: ['pig', 'hog', 'sow', 'sty', 'oink', 'hoof', 'stink',
       'antidisestablishmentarianism'
      ]
    }

    let result = this.wordSearchGenerationService.generateWordSearch(options, this.difficulty);

    result.forEach(row => console.log(row));
  }

  public setDifficulty(difficulty: WordSearchDifficulty) {
    this.difficulty = difficulty;
  }
}
