import { InputErrors } from '../Input/InputErrors';

export interface InputListProps {
    addSlotButtonText: string;
    validators: Array<() => InputErrors>;
}
