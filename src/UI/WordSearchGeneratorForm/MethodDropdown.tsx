import { FormikProps } from 'formik';
import * as React from 'react';
import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { DropdownComponent } from '../Dropdown/ReactDropdownComponent';
import outputOptions from './MethodDropdownOptions';

const MethodDropdown: React.FC<FormikProps<WordSearchGenerationOptions>> = ({
  handleChange,
}) => {
  return (
    <DropdownComponent
      name='outputOption'
      label='Method'
      options={outputOptions}
      updated={handleChange}
    />
  );
};

export { MethodDropdown };
