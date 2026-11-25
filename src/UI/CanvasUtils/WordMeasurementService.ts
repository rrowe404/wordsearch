export class WordMeasurementService {
  /**
   * Determines the width of the widest word in the input array
   * Avoids modifying the original array.
   */
  public getLongestWordWidth(
    context: Pick<CanvasRenderingContext2D, 'measureText'>,
    words: string[]
  ) {
    if (words.length === 0) {
      return 0;
    }

    const longest = this.getLongestWord(context, words.slice());
    return longest.width;
  }

  private getLongestWord(
    context: Pick<CanvasRenderingContext2D, 'measureText'>,
    words: string[]
  ) {
    const measuredWords = this.measureWords(context, words);

    const sorted = measuredWords.sort((a, b) => a.width - b.width);

    const result = sorted[sorted.length - 1];

    return result;
  }

  private measureWords(
    context: Pick<CanvasRenderingContext2D, 'measureText'>,
    words: string[]
  ) {
    return words.map((word) => {
      return {
        word,
        width: context.measureText(word).width,
      };
    });
  }
}
