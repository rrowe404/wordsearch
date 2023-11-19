import * as React from 'react';
import { FormikProps } from 'formik';
import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { InputComponent } from '../Input/ReactInputComponent';

const RowsInput: React.FC<FormikProps<WordSearchGenerationOptions>> = ({
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
