export interface WordPlacementStrategy {
    placeWord(currentState: string[][], word: string);
}