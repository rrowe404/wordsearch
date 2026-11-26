import * as React from 'react';
import { FormikProps } from 'formik';
import { WordSearchGeneratorFormState } from './WordSearchGeneratorFormState';
import { CheckboxComponent } from '../Checkbox/CheckboxComponent';

const DiagonalCheckbox: React.FC<FormikProps<WordSearchGeneratorFormState>> = ({
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
