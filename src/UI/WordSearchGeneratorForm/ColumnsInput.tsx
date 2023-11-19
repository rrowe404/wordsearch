import * as React from 'react';
import { FormikProps } from 'formik';
import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { InputComponent } from '../Input/ReactInputComponent';

const ColumnsInput: React.FC<FormikProps<WordSearchGenerationOptions>> = ({
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
