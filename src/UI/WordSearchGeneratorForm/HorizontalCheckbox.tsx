import * as React from 'react';
import { FormikProps } from 'formik';
import { WordSearchGeneratorFormState } from './WordSearchGeneratorFormState';
import { CheckboxComponent } from '../Checkbox/CheckboxComponent';

const HorizontalCheckbox: React.FC<
  FormikProps<WordSearchGeneratorFormState>
> = ({ handleChange, values }) => {
  return (
    <CheckboxComponent
      label='Horizontal'
      updated={handleChange}
      name='allowHorizontal'
      value={values.allowHorizontal}
    />
  );
};

export { HorizontalCheckbox };
