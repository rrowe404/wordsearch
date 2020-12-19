import { FormikProps } from 'formik';
import { InputErrors } from './InputErrors';

export interface InputProps {
    label?: string;
    name: string;
    inputType?: string;
    min?: number;
    max?: number;
    required?: boolean;

    validators?: Array<(value: string) => InputErrors>;

    formProps: FormikProps<any>; // TODO
}
