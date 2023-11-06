export interface InputProps<T> {
  validate?: (value: string) => string;

  autofocus?: boolean;
  label?: string;
  name: string;
  inputType?: string;
  min?: number;
  max?: number;
  required?: boolean;
  value: T;
  updated(e: React.ChangeEvent<HTMLInputElement>): void;
}
