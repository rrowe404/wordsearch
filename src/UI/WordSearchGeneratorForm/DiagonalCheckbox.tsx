import * as React from 'react';
import { FormikProps } from 'formik';
import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { CheckboxComponent } from '../Checkbox/CheckboxComponent';

const DiagonalCheckbox: React.FC<FormikProps<WordSearchGenerationOptions>> = ({
  handleChange,
  values,
}) => {
  return (
    <CheckboxComponent
      label='Diagonal'
      updated={handleChange}
      name='allowDiagonal'
      value={values.allowDiagonal}
    />
  );
};

export { DiagonalCheckbox };
