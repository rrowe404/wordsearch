import * as React from 'react';
import { InputProps } from './InputProps';
import { ErrorMessage, Field } from 'formik';
import { LabelComponent } from '../Label/LabelComponent';
import * as _ from 'lodash';

class InputState {
    inputType: string;
    validator: (value: string) => string;
}

export class InputComponent extends React.Component<{}, InputState> {
    constructor(public props: InputProps<any>) {
        super(props);

        let validator = props.validate || ((value) => null);

        this.state = {
            inputType: props.inputType || 'text',
            validator
        };
    }

    render() {
        let name = this.props.name;
        let validator = this.state.validator;

        function validate(value) {
            return validator(value);
        }

        return (
            <div>
                <LabelComponent label={this.props.label} />
                <Field onChange={(e) => this.props.updated(e)} type={this.state.inputType} name={this.props.name} value={this.props.value} validate={validate}></Field>
                <ErrorMessage name={this.props.name} />
            </div>
        );
    }
}
