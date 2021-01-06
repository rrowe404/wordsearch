import { InputErrors } from '../Input/InputErrors';

export interface WordSearchGeneratorFormProps {
    wordValidators: Array<(value: string) => InputErrors>;
}
