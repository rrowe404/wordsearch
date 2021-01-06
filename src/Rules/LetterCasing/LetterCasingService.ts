import { WordSearchState } from '../WordSearchState/WordSearchState';

export class LetterCasingService {
    case(currentState: WordSearchState) {
        currentState.iterate((letter, row, column)  => {
            currentState.setValueAt(row, column, letter.toUpperCase());
        });
    }
}
