import { WordSearchOutputStrategyBase } from './WordSearchOutputStrategyBase';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { Injectable } from '@angular/core';
import { WordSearchOutputModule } from './WordSearchOutputModule';

@Injectable({
    providedIn: WordSearchOutputModule
})
export class ImageWordSearchOutputStrategy extends WordSearchOutputStrategyBase {
    public static getValue() {
        return 'image';
    }

    public static getViewValue() {
        return 'Image';
    }

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private letterGap = 20;
    private titleSpace = 20;

    constructor() {
        super();
    }
    
    public output(currentState: WordSearchState): void {
        document.getElementsByTagName('canvas')

        this.currentState = currentState;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext("2d");
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
        let letterArea = this.currentState.rows * this.letterGap;
        let wordListArea = 0;

        if (this.currentState.showWordList) {
            wordListArea = (this.currentState.wordList.length * this.letterGap) + 5; // a little extra in case the last word has letters with descenders
        }

        return this.titleSpace + letterArea + wordListArea;
    }

    protected outputTitle() {
        this.context.textAlign = 'center';

        var x = this.canvas.width / 2;
        var y = this.titleSpace / 2;
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
        this.context.textAlign = 'center';
        let x = this.canvas.width / 2;

        this.currentState.wordList.forEach((word, i) => {
            let y = ((this.letterGap * this.currentState.columns) + (this.letterGap * 2)) + (i * this.letterGap);
            this.context.fillText(word, x, y);
        });
    }
}