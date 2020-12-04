import * as React from 'react';
import { LabelComponent } from '../Label/LabelComponent';
import { InputProps } from './InputProps';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class InputState {
    value: string;
}

export class InputComponent extends React.Component<{}, InputState> {
    constructor(public props: InputProps) {
        super(props);

        this.state = { value: props.value };
    }

    render() {
        return (
            <div>
                <LabelComponent label={this.props.label} />
                <input value={this.state.value} onChange={(e) => this.handleChange(e)}></input>
            </div>
        );
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ value: e.target.value });
    }
}
