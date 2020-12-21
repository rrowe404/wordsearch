import { WordSearchState } from "src/Rules/WordSearchState/WordSearchState";

export interface ReduxState {
    words: string[];
    wordSearchState: WordSearchState;
}