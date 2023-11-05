class WordTracker {
  map: Record<string, boolean> = {};

  constructor(words: string[]) {
    words.forEach((word) => (this.map[word] = false));
  }

  completeWord(word: string) {
    this.map[word] = true;
  }

  isComplete() {
    return Object.keys(this.map).every((key) => this.isWordComplete(key));
  }

  isWordComplete(word: string) {
    return this.map[word];
  }
}

export { WordTracker };
