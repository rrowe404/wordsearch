export interface CheckboxProps {
    label: string;
    name: string;
    value: boolean;
    changed: (checked: boolean) => void;
}
