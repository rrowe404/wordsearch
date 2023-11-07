import { FormikProps } from 'formik';
import * as React from 'react';
import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { ButtonComponent } from '../Button/ReactButtonComponent';

const SubmitButton: React.FC<FormikProps<WordSearchGenerationOptions>> = ({
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
