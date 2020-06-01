import { WordSearchOutputStrategyBase } from './WordSearchOutputStrategyBase';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { Injectable, ElementRef } from '@angular/core';
import { WordSearchOutputModule } from './WordSearchOutputModule';
import { WordSearchOutputStrategy } from './WordSearchOutputStrategy';

@Injectable({
    providedIn: WordSearchOutputModule
})
export class ImageWordSearchOutputStrategy extends WordSearchOutputStrategyBase implements WordSearchOutputStrategy {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private letterGap = 20;
    private titleSpace = 20;

    public static getValue() {
        return 'image';
    }

    public static getViewValue() {
        return 'Image';
    }

    constructor() {
        super();
    }

    public clean() {
        let leftovers = document.getElementsByTagName('canvas');

        // loop backwards since HTMLCollection is a live list
        for (let i = leftovers.length - 1; i >= 0; --i) {
            leftovers[i].remove();
        }
    }

    public output(currentState: WordSearchState): void {
        this.currentState = currentState;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = this.getCanvasWidth();
        this.canvas.height = this.getCanvasHeight();
        super.output(currentState);
        document.body.appendChild(this.canvas);
    }

    private getCanvasWidth() {
        let letterArea = this.currentState.columns * this.letterGap;
        let gutters = this.letterGap;

        return letterArea + gutters;
    }

    private getCanvasHeight() {
        let wordListArea = 0;

        if (this.currentState.showWordList) {
            let extraSpace = 5; // in case the last word has letters with descenders
            wordListArea = (this.currentState.wordList.length * this.letterGap) + extraSpace;
        }

        return this.titleSpace + this.getPuzzleHeight() + wordListArea;
    }

    private getPuzzleHeight() {
        return this.currentState.rows * this.letterGap;
    }

    protected outputTitle() {
        this.context.textAlign = 'center';

        let x = this.canvas.width / 2;
        let y = this.titleSpace / 2;
        this.context.fillText(this.currentState.title, x, y);
    }

    protected outputPuzzle() {
        this.context.textAlign = 'center';

        this.currentState.matrix.forEach((row, i) => {
            row.forEach((letter, j) => {
                let x = (j + 1) * this.letterGap;
                let y = (i + 1) * this.letterGap + this.titleSpace;
                this.context.fillText(letter, x, y);
            });
        });
    }

    protected outputTotal() {
    }

    protected outputWordList() {
        this.context.textAlign = 'left';

        let baseX = this.letterGap / 2;
        let wordListColumns = this.getWordListColumns();
        let columnWidth = Math.floor(this.canvas.width / wordListColumns);

        this.currentState.wordList.forEach((word, i) => {
            let column = i % wordListColumns;
            let x = baseX + (column * columnWidth);

            let row = Math.floor(i / wordListColumns);

            let y = (this.getPuzzleHeight() + (this.letterGap * 2)) + (row * this.letterGap);
            this.context.fillText(word, x, y);
        });
    }

    private getWordListColumns() {
        return Math.floor(this.canvas.width / (this.getLongestWordWidth() + this.letterGap));
    }

    private getLongestWordWidth() {
        let longest = this.getLongestWord();
        return longest.width;
    }

    private getLongestWord() {
        let measuredWords = this.measureWords();

        let sorted = measuredWords.sort((a, b) => a.width - b.width);

        let result = sorted[sorted.length - 1];

        return result;
    }

    private measureWords() {
        // do not modify original
        return this.currentState.wordList.slice().map(word => {
            return {
                word,
                width: this.context.measureText(word).width
            };
        });
    }
}
