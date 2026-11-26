import * as React from 'react';
import { FormikProps } from 'formik';
import { WordSearchGeneratorFormState } from './WordSearchGeneratorFormState';
import { InputComponent } from '../Input/ReactInputComponent';

const RowsInput: React.FC<FormikProps<WordSearchGeneratorFormState>> = ({
  handleChange,
  values,
}) => {
  return (
    <InputComponent
      label='Rows'
      min={5}
      max={30}
      name='height'
      inputType='range'
      updated={handleChange}
      value={values.height}
    />
  );
};

export { RowsInput };
