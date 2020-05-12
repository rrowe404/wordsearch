import { Component, OnInit } from '@angular/core';
import { WordSearchGenerationService } from 'src/WordSearchGeneration/WordSearchGenerationService';
import { WordSearchDifficulty } from 'src/WordSearchDifficulty/WordSearchDifficulty';
import { WordSearchGenerationOptions } from 'src/WordSearchGenerationOptions/WordSearchGenerationOptions';

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

  public ngOnInit() {
    let difficulty = WordSearchDifficulty.Medium;
    let options: WordSearchGenerationOptions = {
      height: 10,
      width: 10,
      words: ['pig', 'hog', 'sow', 'sty', 'oink', 'hoof', 'stink']
    }

    let result = this.wordSearchGenerationService.generateWordSearch(options, difficulty);

    result.forEach(row => console.log(row));
  }
}
