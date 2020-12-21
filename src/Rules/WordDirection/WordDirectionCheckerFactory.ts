import { WordDirection } from './WordDirection';
import { WordDirectionChecker } from './WordDirectionChecker';
import { HorizontalWordDirectionChecker } from './HorizontalWordDirectionChecker';
import { DiagonalWordDirectionChecker } from './DiagonalWordDirectionChecker';
import { VerticalWordDirectionChecker } from './VerticalWordDirectionChecker';

export class WordDirectionCheckerFactory {
    private horizontalChecker = new HorizontalWordDirectionChecker();
    private verticalChecker = new VerticalWordDirectionChecker();
    private diagonalChecker = new DiagonalWordDirectionChecker();

    public getDirectionChecker(direction: WordDirection): WordDirectionChecker {
        switch (direction) {
            case WordDirection.Horizontal:
                return this.horizontalChecker;

            case WordDirection.Vertical:
                return this.verticalChecker;

            case WordDirection.Diagonal:
                return this.diagonalChecker;

            default:
                throw new Error(`That ain't no direction I ever heard of!`);
        }
    }
}
