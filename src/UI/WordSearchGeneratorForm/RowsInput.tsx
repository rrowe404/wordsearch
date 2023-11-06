import * as React from 'react';
import { FormikProps } from 'formik';
import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { InputComponent } from '../Input/ReactInputComponent';
import { revalidatingHandleChange } from 'src/helpers/form/RevalidatingHandleChange';

const RowsInput: React.FC<FormikProps<WordSearchGenerationOptions>> = (
  props
) => {
  return (
    <InputComponent
      label='Rows'
      name='height'
      inputType='number'
      updated={(e) => revalidatingHandleChange(e, props)}
      value={props.values.height}
    />
  );
};

export { RowsInput };
