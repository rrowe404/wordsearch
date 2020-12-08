import { Field, Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { LabelComponent } from '../Label/LabelComponent';
import { DropdownProps } from './DropdownProps';

export class DropdownComponent extends React.Component {
    constructor(public props: DropdownProps) {
        super(props);
    }

    render() {
        let initialValues = {};

        return (
            <Formik initialValues={initialValues} onSubmit={() => { }}>
                {props => (
                    <Form>
                        <LabelComponent label={this.props.label} />
                        <Field as='select' name={this.props.label} onChange={(e) => this.handleChange(e, props)}>
                            {this.props.options.map(option => {
                                return <option value={option.value} key={option.value}>
                                    {option.viewValue}
                                </option>;
                            })}
                        </Field>
                    </Form>
                )}
            </Formik>
        );
    }

    handleChange(e: React.ChangeEvent<HTMLSelectElement>, props: FormikProps<any>) {
        props.handleChange(e);
        this.props.updated(e.target.value);
    }
}
