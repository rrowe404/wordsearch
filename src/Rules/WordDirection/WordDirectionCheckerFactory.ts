import { WordDirection } from './WordDirection';
import { WordDirectionChecker } from './WordDirectionChecker';
import { HorizontalWordDirectionChecker } from './HorizontalWordDirectionChecker';
import { DiagonalWordDirectionChecker } from './DiagonalWordDirectionChecker';
import { VerticalWordDirectionChecker } from './VerticalWordDirectionChecker';
import { Injectable } from '@angular/core';
import { WordDirectionModule } from './WordDirectionModule';

@Injectable({
    providedIn: WordDirectionModule
})
export class WordDirectionCheckerFactory {
    constructor(
        private horizontalChecker: HorizontalWordDirectionChecker,
        private verticalChecker: VerticalWordDirectionChecker,
        private diagonalChecker: DiagonalWordDirectionChecker
    ) {
    }

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
