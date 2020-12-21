import { InputErrors } from './InputErrors';

export interface InputProps<T> {
    label?: string;
    name: string;
    inputType?: string;
    min?: number;
    max?: number;
    required?: boolean;
    value: T;

    updated(e: React.ChangeEvent<HTMLInputElement>): void;
}
