import { ErrorMessage, ErrorMessageProps, FormikErrors } from 'formik';
import * as React from 'react';

interface CustomErrorMessageProps extends ErrorMessageProps {
    /** Only pass this for validations like yup.object that won't automatically show up in ErrorMessage */
    errors?: FormikErrors<any>;
}

export class CustomErrorMessage extends React.Component<CustomErrorMessageProps> {
    render() {
        return <div className='error'>
            {this.formikErrorMessage()}
            {this.nativeErrorMessage()}
            {/** The space makes the height show up correctly even when there is no error! */}
            &nbsp;
        </div>;
    }

    private formikErrorMessage() {
        return <ErrorMessage {...this.props} />;
    }

    private nativeErrorMessage() {
        return <>
            {this.props.errors ? this.props.errors[this.props.name] : null}
        </>;
    }
}
