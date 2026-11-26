import * as React from 'react';
import { FormikProps } from 'formik';
import { WordSearchGeneratorFormState } from './WordSearchGeneratorFormState';
import { InputComponent } from '../Input/ReactInputComponent';

const TitleInput: React.FC<FormikProps<WordSearchGeneratorFormState>> = ({
  handleChange,
  values,
}) => {
  return (
    <InputComponent
      autofocus={true}
      label='Title'
      name='title'
      updated={handleChange}
      value={values.title}
    />
  );
};

export { TitleInput };
