import * as React from 'react';
import { FormikProps } from 'formik';
import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { InputComponent } from '../Input/ReactInputComponent';

const TitleInput: React.FC<FormikProps<WordSearchGenerationOptions>> = (
  props
) => {
  return (
    <InputComponent
      label='Title'
      name='title'
      updated={props.handleChange}
      value={props.values.title}
    />
  );
};

export { TitleInput };
