export interface InputListProps {
    addSlotButtonText: string;
    validator: (value: string) => string;
    handleChange: (e: React.ChangeEvent) => void;
    updated(words: string[]): void;
}
