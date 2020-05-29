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

    constructor() {
        super();
    }
    
    public output(currentState: WordSearchState): void {
        this.currentState = currentState;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext("2d");
        this.canvas.width = this.currentState.columns * 20;
        this.canvas.height = (this.currentState.rows * 20) + 200;
        super.output(currentState);
        document.body.appendChild(this.canvas);
    }

    protected outputTitle() {
        var x = this.canvas.width / 2;
        var y = this.canvas.height / 3;
        this.context.fillText(this.currentState.title, x, y);
    }

    protected outputPuzzle() {
    }

    protected outputTotal() {
    }

    protected outputWordList() {
    }
}