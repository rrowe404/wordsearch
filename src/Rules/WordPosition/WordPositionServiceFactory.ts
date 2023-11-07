import { WordDirection } from 'src/Rules/WordDirection/WordDirection';
import { HorizontalWordPositionService } from './HorizontalWordPositionService';
import { VerticalWordPositionService } from './VerticalWordPositionService';
import { BottomUpDiagonalWordPositionService } from './BottomUpDiagonalWordPositionService';
import { TopDownDiagonalWordPositionService } from './TopDownDiagonalWordPositionService';
import { RandomNumberGeneratorService } from '../RandomNumberGenerator/RandomNumberGeneratorService';
import { WordPositionServiceBase } from './WordPositionServiceBase';

export class WordPositionServiceFactory {
  private randomNumberGeneratorService = new RandomNumberGeneratorService();
  private horizontalWordPositionService = new HorizontalWordPositionService();
  private verticalWordPositionService = new VerticalWordPositionService();
  private bottomUpDiagonalWordPositionService =
    new BottomUpDiagonalWordPositionService();
  private topDownDiagonalWordPositionService =
    new TopDownDiagonalWordPositionService();

  public getService(direction: WordDirection): WordPositionServiceBase {
    switch (direction) {
      case WordDirection.Horizontal:
        return this.horizontalWordPositionService;

      case WordDirection.Vertical:
        return this.verticalWordPositionService;

      case WordDirection.Diagonal:
        return this.randomNumberGeneratorService.flipACoin()
          ? this.bottomUpDiagonalWordPositionService
          : this.topDownDiagonalWordPositionService;

      default:
        throw new Error('Not Implemented!');
    }
  }
}
