import { FormikProps } from 'formik';
import * as React from 'react';
import { WordSearchGeneratorFormState } from './WordSearchGeneratorFormState';
import { ButtonComponent } from '../Button/ReactButtonComponent';

const SubmitButton: React.FC<FormikProps<WordSearchGeneratorFormState>> = ({
  isValid,
  touched,
}) => {
  return (
    <ButtonComponent
      buttonType='submit'
      color='primary'
      text='Generate'
      disabled={!touched || !isValid}
    />
  );
};

export { SubmitButton };
