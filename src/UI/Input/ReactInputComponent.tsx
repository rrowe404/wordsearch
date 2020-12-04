import * as React from 'react';
import { LabelComponent } from '../Label/LabelComponent';
import { InputProps } from './InputProps';
import { InputErrors } from './InputErrors';
import { ErrorsComponent } from '../Errors/ErrorsComponent';

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
        return (
            <div>
                <LabelComponent label={this.props.label} />
                <input type={this.props.inputType} value={this.state.value} onChange={(e) => this.handleChange(e)}></input>
                <ErrorsComponent errors={this.state.errors} />
            </div>
        );
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let value = e.target.value;
        let errors = this.processErrors(value);
        this.setState({ errors, value });
    }

    processErrors(value: string) {
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
                let errors = validator(this.state.value);

                Object.assign(result, errors);
            });
        }


        return result;
    }

    minMax() {
        return `(${this.props.min}-${this.props.max})`;
    }
}
