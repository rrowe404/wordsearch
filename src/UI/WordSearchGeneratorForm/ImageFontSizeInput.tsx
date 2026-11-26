import * as React from 'react';
import { FormikProps } from 'formik';
import { InputComponent } from '../Input/ReactInputComponent';
import { WordSearchGeneratorFormState } from './WordSearchGeneratorFormState';

interface ImageFontSizeInputProps {
  handleChange: FormikProps<WordSearchGeneratorFormState>['handleChange'];
  value: number;
}

const ImageFontSizeInput: React.FC<ImageFontSizeInputProps> = ({
  handleChange,
  value,
}) => {
  return (
    <InputComponent
      label='Image Font Size'
      min={8}
      max={40}
      name='fontSize'
      inputType='range'
      updated={handleChange}
      value={value}
    />
  );
};

export { ImageFontSizeInput };
