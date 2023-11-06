import * as React from 'react';
import { FormikProps } from 'formik';
import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { CheckboxComponent } from '../Checkbox/ReactCheckboxComponent';

const VerticalCheckbox: React.FC<FormikProps<WordSearchGenerationOptions>> = ({
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
