import * as React from 'react';
import { FormikProps } from 'formik';
import { WordSearchGeneratorFormState } from './WordSearchGeneratorFormState';
import { CheckboxComponent } from '../Checkbox/CheckboxComponent';

const VerticalCheckbox: React.FC<FormikProps<WordSearchGeneratorFormState>> = ({
  handleChange,
  values,
}) => {
  return (
    <CheckboxComponent
      label='Vertical'
      updated={handleChange}
      name='allowVertical'
      value={values.allowVertical}
    />
  );
};

export { VerticalCheckbox };
