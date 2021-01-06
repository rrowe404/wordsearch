export class WordMeasurementService {
    /**
     * Determines the width of the widest word in the input array
     * Avoids modifying the original array.
     */
    public getLongestWordWidth(context: CanvasRenderingContext2D, words: string[]) {
        let longest = this.getLongestWord(context, words.slice());
        return longest.width;
    }

    private getLongestWord(context: CanvasRenderingContext2D, words: string[]) {
        let measuredWords = this.measureWords(context, words);

        let sorted = measuredWords.sort((a, b) => a.width - b.width);

        let result = sorted[sorted.length - 1];

        return result;
    }

    private measureWords(context: CanvasRenderingContext2D, words: string[]) {
        return words.map(word => {
            return {
                word,
                width: context.measureText(word).width
            };
        });
    }
}
