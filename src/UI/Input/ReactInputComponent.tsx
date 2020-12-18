import * as React from 'react';
import { InputProps } from './InputProps';
import { ErrorMessage, Field } from 'formik';
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
                <Field onChange={(e) => this.handleChange(e)} type={this.state.inputType} name={this.props.name} value={this.props.value}></Field>
                <ErrorMessage name={this.props.name} />
            </div>
        );
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.formProps.handleChange(e);
    }
}
