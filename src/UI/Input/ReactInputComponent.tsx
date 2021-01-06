import * as React from 'react';
import { InputProps } from './InputProps';
import { ErrorMessage, Field } from 'formik';
import { LabelComponent } from '../Label/LabelComponent';
import * as _ from 'lodash';
import { CustomErrorMessage } from '../CustomErrorMessage/CustomErrorMessage';

class InputState {
    hasAutofocused: boolean;
    inputType: string;
    validator: (value: string) => string;
}

export class InputComponent extends React.Component<{}, InputState> {
    constructor(public props: InputProps<any>) {
        super(props);

        let validator = props.validate || ((value) => null);

        this.state = {
            hasAutofocused: false,
            inputType: props.inputType || 'text',
            validator
        };
    }

    private autofocus(ref) {
        if (ref && this.props.autofocus && !this.state.hasAutofocused) {
            ref.focus();
            this.setState({ hasAutofocused: true });
        }
    }

    render() {
        let validator = this.state.validator;

        function validate(value) {
            return validator(value);
        }

        return (
            <div className='inputContainer'>
                <LabelComponent label={this.props.label} />
                <Field innerRef={ref => this.autofocus(ref)} onChange={(e) => this.props.updated(e)}
                       type={this.state.inputType} name={this.props.name} value={this.props.value} validate={validate}>
                </Field>
                <CustomErrorMessage name={this.props.name} />
            </div>
        );
    }
}
