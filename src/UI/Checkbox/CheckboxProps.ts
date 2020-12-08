export interface CheckboxProps {
    label: string;
    name: string;
    value: boolean;
    updated: (checked: boolean) => void;
}
