import * as React from 'react';
import { LabelComponent } from '../Label/LabelComponent';
import { InputProps } from './InputProps';
import { InputErrors } from './InputErrors';
import { ErrorsComponent } from '../Errors/ErrorsComponent';
import { Field, Form, Formik, FormikProps, useFormik } from 'formik';

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
        let initialValues = {};
        initialValues[this.props.name] = this.state.value;

        let initialErrors = this.validate(initialValues);

        return (
            <Formik initialErrors={initialErrors} initialValues={initialValues}
                    onSubmit={() => { }} validate={(values) => this.validate(values)}>
                {props => (
                    <Form>
                        <LabelComponent label={this.props.label} />
                        <Field onChange={(e) => this.handleChange(e, props)} type={this.state.inputType} name={this.props.name}></Field>
                        <ErrorsComponent errors={props.errors} />
                    </Form>
                )}
            </Formik>
        );
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>, props: FormikProps<any>) {
        props.handleChange(e);
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
