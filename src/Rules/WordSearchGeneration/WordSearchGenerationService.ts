import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { WordSearchStateFactory } from '../WordSearchState/WordSearchStateFactory';
import { LetterCasingService } from '../LetterCasing/LetterCasingService';
import { LetterPlaceholderFillService } from '../LetterPlaceholder/LetterPlaceholderFillService';
import { WordPlacementService } from '../WordPlacement/WordPlacementService';
import { WordSearchState } from '../WordSearchState/WordSearchState';

export class WordSearchGenerationService {
  private letterCasingService = new LetterCasingService();
  private letterPlaceholderFillService = new LetterPlaceholderFillService();
  private wordPlacementService = new WordPlacementService();
  private wordSearchStateFactory = new WordSearchStateFactory();

  public generateWordSearch(options: WordSearchGenerationOptions) {
    // generate blank matrix
    let wordSearch = this.wordSearchStateFactory.createWordSearch(options);

    const transforms: Array<(state: WordSearchState) => WordSearchState> = [
      (state) => this.wordPlacementService.placeWords(state),
      (state) => this.letterPlaceholderFillService.fill(state),
      (state) => this.letterCasingService.case(state),
    ];

    transforms.forEach((transform) => {
      wordSearch = transform(wordSearch);
    });

    return wordSearch;
  }
}
