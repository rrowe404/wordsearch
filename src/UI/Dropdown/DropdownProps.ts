import { DropdownOption } from './DropdownOption';

export interface DropdownProps {
    label: string;
    options: DropdownOption<any>[];
    updated(value: string): void;
}
