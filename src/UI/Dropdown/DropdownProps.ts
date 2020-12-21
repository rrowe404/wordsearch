import { DropdownOption } from './DropdownOption';

export interface DropdownProps {
    name: string;
    label: string;
    options: DropdownOption<any>[];
    updated(value: string): void;
}
