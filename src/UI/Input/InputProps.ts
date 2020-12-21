export interface InputProps<T> {
    autofocus?: boolean;
    label?: string;
    name: string;
    inputType?: string;
    min?: number;
    max?: number;
    required?: boolean;
    value: T;

    updated(e: React.ChangeEvent<HTMLInputElement>): void;
    validate?: (value: string) => string;
}
