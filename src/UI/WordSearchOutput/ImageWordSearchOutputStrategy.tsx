import * as React from 'react';
import { WordSearchOutputStrategyBase } from '../../Rules/WordSearchOutput/WordSearchOutputStrategyBase';
import { WordSearchState } from '../../Rules/WordSearchState/WordSearchState';
import { WordSearchOutputStrategy } from '../../Rules/WordSearchOutput/WordSearchOutputStrategy';
import { WordMeasurementService } from '../CanvasUtils/WordMeasurementService';
import { WordSearchOutputOption } from '../../Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';

export class ImageWordSearchOutputStrategy
  extends WordSearchOutputStrategyBase
  implements WordSearchOutputStrategy
{
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private wordMeasurementService = new WordMeasurementService();

  private wordListBottomMargin = 5;
  private letterGap = 20;
  private titleSpace = 20;

  public static getValue(): typeof WordSearchOutputOption.Image {
    return WordSearchOutputOption.Image;
  }

  public static getViewValue() {
    return 'Image';
  }

  public output(currentState: WordSearchState) {
    const options = currentState.options;
    if (options.outputOption !== ImageWordSearchOutputStrategy.getValue()) {
      throw new Error('Image output requires image generation options');
    }

    this.currentState = currentState;
    this.letterGap = options.fontSize * 2;
    this.titleSpace = this.wordListBottomMargin + options.fontSize;
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.context.font = `${options.fontSize}px sans-serif`;
    this.canvas.width = this.getCanvasWidth();
    this.context.font = `${options.fontSize}px sans-serif`;
    this.canvas.height = this.getCanvasHeight();
    this.context.font = `${options.fontSize}px sans-serif`;
    super.output(currentState);
    this.fillBackground();
    const src = this.canvas.toDataURL();
    return (
      <div>
        <img src={src}></img>
      </div>
    );
  }

  private fillBackground() {
    // add behind other elements
    this.context.globalCompositeOperation = 'destination-over';

    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private getCanvasWidth() {
    const puzzleWidth = (this.currentState.columns + 1) * this.letterGap;
    const wordListWidth = this.currentState.showWordList
      ? this.wordMeasurementService.getLongestWordWidth(
          this.context,
          this.currentState.wordList
        ) + this.letterGap
      : 0;

    return Math.max(puzzleWidth, wordListWidth);
  }

  private getCanvasHeight() {
    let total = 0;

    total += this.getTitleSpace();
    total += this.getPuzzleHeight();
    total += this.getWordListHeight();

    return total;
  }

  protected outputTitle() {
    this.context.textAlign = 'center';
    this.context.textBaseline = 'top';

    const x = this.canvas.width / 2;
    const y = this.wordListBottomMargin;
    this.context.fillText(this.currentState.title, x, y);
  }

  protected outputPuzzle() {
    this.context.textAlign = 'center';
    this.context.textBaseline = 'alphabetic';
    const puzzleOffset =
      (this.canvas.width - (this.currentState.columns + 1) * this.letterGap) /
      2;

    this.currentState.iterate((letter, row, column) => {
      const x = puzzleOffset + (column + 1) * this.letterGap;
      const y = (row + 1) * this.letterGap + this.getTitleSpace();
      this.context.fillText(letter, x, y);
    });
  }

  protected outputTotal() {}

  protected outputWordList() {
    if (!this.currentState.showWordList || !this.currentState.wordList.length) {
      return;
    }

    this.context.textAlign = 'left';
    this.context.textBaseline = 'alphabetic';

    const wordListColumns = this.getWordListColumns();
    const columnWidth =
      this.wordMeasurementService.getLongestWordWidth(
        this.context,
        this.currentState.wordList
      ) + this.letterGap;
    const baseX =
      (this.canvas.width - wordListColumns * columnWidth) / 2 +
      this.letterGap / 2;

    const getWordListX = (index: number) => {
      const column = index % wordListColumns;
      const result = baseX + column * columnWidth;
      return result;
    };

    const getWordListY = (index: number) => {
      const row = Math.floor(index / wordListColumns);
      const result =
        this.getTitleSpace() +
        this.getPuzzleHeight() +
        (row + 1) * this.letterGap;
      return result;
    };

    this.currentState.wordList.forEach((word, i) => {
      this.context.fillText(word, getWordListX(i), getWordListY(i));
    });
  }

  private getPuzzleHeight() {
    return this.currentState.rows * this.letterGap;
  }

  private getTitleSpace() {
    if (this.currentState.title) {
      return this.titleSpace;
    }

    return 0;
  }

  private getWordListColumns() {
    const longestWordWidth = this.wordMeasurementService.getLongestWordWidth(
      this.context,
      this.currentState.wordList
    );
    return Math.max(
      1,
      Math.floor(this.canvas.width / (longestWordWidth + this.letterGap))
    );
  }

  private getWordListHeight() {
    if (!this.currentState.showWordList || !this.currentState.wordList.length) {
      if (!this.currentState.title) {
        return this.letterGap / 2;
      }

      return this.wordListBottomMargin;
    }

    const wordListRows = Math.ceil(
      this.currentState.wordList.length / this.getWordListColumns()
    );
    return wordListRows * this.letterGap + this.wordListBottomMargin;
  }
}
