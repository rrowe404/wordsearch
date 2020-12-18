import { FormikProps } from 'formik';
import { InputErrors } from './InputErrors';

export interface InputProps {
    label?: string;
    name: string;
    inputType?: string;
    min?: number;
    max?: number;
    required?: boolean;
    value: string;

    validators?: Array<(value: string) => InputErrors>;
    updated(value: string): void;

    formProps: FormikProps<any>; // TODO
}
