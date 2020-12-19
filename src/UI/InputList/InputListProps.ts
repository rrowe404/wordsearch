import { FormikProps } from 'formik';
import { InputErrors } from '../Input/InputErrors';

export interface InputListProps {
    addSlotButtonText: string;
    validators: Array<(value: string) => InputErrors>;
    updated(words: string[]): void;
}
