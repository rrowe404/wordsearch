import { WordSearchOutputStrategyBase } from '../../Rules/WordSearchOutput/WordSearchOutputStrategyBase';
import { WordSearchOutputOption } from '../../Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';

/** Debug only. Should not be available in prod mode. */
export class ConsoleWordSearchOutputStrategy extends WordSearchOutputStrategyBase {
    public static getValue(): typeof WordSearchOutputOption.Console {
        return WordSearchOutputOption.Console;
    }

    public static getViewValue() {
        return 'Console';
    }

    protected outputTitle() {
        console.log(this.currentState.title);
    }

    protected outputPuzzle() {
        this.currentState.matrix.forEach(row => console.log(row));
    }

    protected outputTotal() {
        console.log(this.currentState.totalMessage);
    }

    protected outputWordList() {
        this.currentState.wordList.forEach(word => console.log(word));
    }
}
