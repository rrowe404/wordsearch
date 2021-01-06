export interface CheckboxProps {
    label: string;
    name: string;
    value: boolean;
    updated: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
