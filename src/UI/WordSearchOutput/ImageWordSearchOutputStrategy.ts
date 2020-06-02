import { WordSearchOutputStrategyBase } from '../../Rules/WordSearchOutput/WordSearchOutputStrategyBase';
import { WordSearchState } from '../../Rules/WordSearchState/WordSearchState';
import { Injectable } from '@angular/core';
import { WordSearchOutputModule } from './WordSearchOutputModule';
import { WordSearchOutputStrategy } from '../../Rules/WordSearchOutput/WordSearchOutputStrategy';
import { WordMeasurementService } from '../CanvasUtils/WordMeasurementService';
import { ElementRemovalService } from '../HTMLUtils/ElementRemovalService';

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

    constructor(
        private elementRemovalService: ElementRemovalService,
        private wordMeasurementService: WordMeasurementService
    ) {
        super();
    }

    public clean() {
        let leftovers = document.getElementsByTagName('canvas');
        this.elementRemovalService.removeAll(leftovers);
    }

    public output(currentState: WordSearchState): void {
        this.currentState = currentState;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = this.getCanvasWidth();
        this.canvas.height = this.getCanvasHeight();
        super.output(currentState);
        this.fillBackground();
        document.body.appendChild(this.canvas);
    }

    private fillBackground() {
        // add behind other elements
        this.context.globalCompositeOperation = 'destination-over';

        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private getCanvasWidth() {
        let letterArea = this.currentState.columns * this.letterGap;
        let gutters = this.letterGap;

        return letterArea + gutters;
    }

    private getCanvasHeight() {
        let total = 0;

        total += this.titleSpace;
        total += this.getPuzzleHeight();
        total += this.getWordListHeight();

        return total;
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
        let longestWordWidth = this.wordMeasurementService.getLongestWordWidth(this.context, this.currentState.wordList);
        return Math.floor(this.canvas.width / (longestWordWidth + this.letterGap));
    }

    private getWordListHeight() {
        if (this.currentState.showWordList) {
            let extraSpace = 5; // in case the last word has letters with descenders
            let wordListArea = (this.currentState.wordList.length * this.letterGap) + extraSpace;
            return wordListArea;
        }

        return 0;
    }
}
