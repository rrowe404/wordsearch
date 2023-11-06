import { ErrorMessage, ErrorMessageProps, FormikErrors } from 'formik';
import * as React from 'react';

interface CustomErrorMessageProps extends ErrorMessageProps {
  /** Only pass this for validations like yup.object that won't automatically show up in ErrorMessage */
  errors?: FormikErrors<unknown>;
}

const FormikErrorMessage: React.FC<CustomErrorMessageProps> = (props) => {
  return <ErrorMessage {...props} />;
};

const NativeErrorMessage: React.FC<CustomErrorMessageProps> = (props) => {
  return <>{props.errors ? props.errors[props.name] : null}</>;
};

export const CustomErrorMessage: React.FC<CustomErrorMessageProps> = (
  props
) => {
  return (
    <div className='error'>
      <FormikErrorMessage {...props} />
      <NativeErrorMessage {...props} />
      {/** The space makes the height show up correctly even when there is no error! */}
      &nbsp;
    </div>
  );
};
