import * as React from 'react';
import { FormikProps } from 'formik';
import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { CheckboxComponent } from '../Checkbox/CheckboxComponent';

const HorizontalCheckbox: React.FC<
  FormikProps<WordSearchGenerationOptions>
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
