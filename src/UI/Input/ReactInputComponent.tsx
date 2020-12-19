import * as React from 'react';
import { InputProps } from './InputProps';
import { ErrorMessage, Field } from 'formik';
import { LabelComponent } from '../Label/LabelComponent';
import * as _ from 'lodash';

class InputState {
    inputType: string;
}

export class InputComponent extends React.Component<{}, InputState> {
    constructor(public props: InputProps) {
        super(props);

        this.state = {
            inputType: props.inputType || 'text',
        };
    }

    render() {
        let value = this.props.formProps.values[this.props.name];

        return (
            <div>
                <LabelComponent label={this.props.label} />
                <Field onChange={(e) => this.props.updated(e)} type={this.state.inputType} name={this.props.name} value={value}></Field>
                <ErrorMessage name={this.props.name} />
            </div>
        );
    }
}
