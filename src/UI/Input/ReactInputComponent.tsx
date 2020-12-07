import * as React from 'react';
import { LabelComponent } from '../Label/LabelComponent';
import { InputProps } from './InputProps';
import { InputErrors } from './InputErrors';
import { ErrorsComponent } from '../Errors/ErrorsComponent';
import { Field, Form, Formik } from 'formik';

class InputState {
    errors: InputErrors;
    value: string;
}

export class InputComponent extends React.Component<{}, InputState> {
    constructor(public props: InputProps) {
        super(props);

        this.state = { value: props.value || '', errors: {} };
    }

    render() {
        let initialValues = {};
        initialValues[this.props.name] = this.state.value;

        return (
            <Formik initialValues={initialValues} onSubmit={() => {}} validate={(values) => this.validate(values)}>
                <Form>
                    <LabelComponent label={this.props.label} />
                    <Field type={this.props.inputType} name={this.props.name}></Field>
                    <ErrorsComponent errors={this.state.errors} />
                </Form>
            </Formik>
        );
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value;
        this.setState({ value });
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

        this.setState({ errors: result });

        return result;
    }
}
