import { InputErrors } from './InputErrors';

export interface InputProps<T> {
    label?: string;
    name: string;
    inputType?: string;
    min?: number;
    max?: number;
    required?: boolean;
    value: T;

    validators?: Array<(value: string) => InputErrors>;
    updated(e: React.ChangeEvent<HTMLInputElement>): void;
}
