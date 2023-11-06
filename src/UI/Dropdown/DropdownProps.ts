import { DropdownOption } from './DropdownOption';

export interface DropdownProps<T> {
  name: string;
  label: string;
  options: DropdownOption<T>[];
  updated(value: string): void;
}
