import { FormikProps } from 'formik';
import * as React from 'react';
import { DropdownComponent } from '../Dropdown/ReactDropdownComponent';
import outputOptions from './MethodDropdownOptions';
import { WordSearchGeneratorFormState } from './WordSearchGeneratorFormState';

const MethodDropdown: React.FC<FormikProps<WordSearchGeneratorFormState>> = ({
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
