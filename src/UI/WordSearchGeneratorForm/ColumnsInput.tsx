import * as React from 'react';
import { FormikProps } from 'formik';
import { WordSearchGeneratorFormState } from './WordSearchGeneratorFormState';
import { InputComponent } from '../Input/ReactInputComponent';

const ColumnsInput: React.FC<FormikProps<WordSearchGeneratorFormState>> = ({
  handleChange,
  values,
}) => {
  return (
    <InputComponent
      label='Columns'
      min={5}
      max={30}
      name='width'
      inputType='range'
      updated={handleChange}
      value={values.width}
    />
  );
};

export { ColumnsInput };
