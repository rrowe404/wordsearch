import * as React from 'react';
import { InputProps } from './InputProps';
import { InputErrors } from './InputErrors';
import { ErrorMessage, Field, FormikProps } from 'formik';
import { LabelComponent } from '../Label/LabelComponent';
import * as _ from 'lodash';

class InputState {
    inputType: string;
    value: string;
}

export class InputComponent extends React.Component<{}, InputState> {
    constructor(public props: InputProps) {
        super(props);

        this.state = {
            inputType: props.inputType || 'text',
            value: props.value || ''
        };
    }

    render() {
        return (
            <div>
                <LabelComponent label={this.props.label} />
                <Field onChange={(e) => this.handleChange(e)} type={this.state.inputType} name={this.props.name}></Field>
                <ErrorMessage name={this.props.name} />
            </div>
        );
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.formProps.handleChange(e);
        this.props.updated(e.target.value);
    }

    minMax() {
        return `(${this.props.min}-${this.props.max})`;
    }

    validate(values) {
        let value = values[this.props.name];
        let result: InputErrors = {};

        if (this.props.required && !value) {
            result.required = 'Required';
        }

        if ('min' in this.props && parseInt(value, 10) < this.props.min) {
            result.min = this.minMax();
        }

        if ('max' in this.props && parseInt(value, 10) > this.props.max) {
            result.max = this.minMax();
        }

        if (this.props.validators) {
            this.props.validators.forEach(validator => {
                let errors = validator(value);

                Object.assign(result, errors);
            });
        }

        return result;
    }
}
