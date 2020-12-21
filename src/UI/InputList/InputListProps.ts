export interface InputListProps {
    addSlotButtonText: string;
    updated(words: string[]): void;
    validator: (value: string) => string;
    handleChange: (e: React.ChangeEvent) => void;
}
