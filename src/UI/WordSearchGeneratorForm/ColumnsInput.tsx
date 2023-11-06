import * as React from 'react';
import { FormikProps } from 'formik';
import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { revalidatingHandleChange } from 'src/helpers/form/RevalidatingHandleChange';
import { InputComponent } from '../Input/ReactInputComponent';

const ColumnsInput: React.FC<FormikProps<WordSearchGenerationOptions>> = (
  props
) => {
  return (
    <InputComponent
      label='Columns'
      name='width'
      inputType='number'
      updated={(e) => revalidatingHandleChange(e, props)}
      value={props.values.width}
    />
  );
};

export { ColumnsInput };
