import { Field } from 'formik';
import * as React from 'react';
import { LabelComponent } from '../Label/LabelComponent';
import { DropdownProps } from './DropdownProps';

export class DropdownComponent extends React.Component {
    constructor(public props: DropdownProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <LabelComponent label={this.props.label} />
                <Field as='select' name={this.props.name} onChange={(e) => this.props.updated(e)}>
                    {this.props.options.map(option => {
                        return <option value={option.value} key={option.value}>
                            {option.viewValue}
                        </option>;
                    })}
                </Field>
            </div>
        );
    }
}
