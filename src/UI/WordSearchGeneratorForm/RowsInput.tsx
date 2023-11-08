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
      min={5}
      max={30}
      name='height'
      inputType='range'
      updated={(e) => revalidatingHandleChange(e, props)}
      value={props.values.height}
    />
  );
};

export { RowsInput };
