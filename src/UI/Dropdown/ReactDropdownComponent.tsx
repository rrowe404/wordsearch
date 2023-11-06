import { Field } from 'formik';
import * as React from 'react';
import { LabelComponent } from '../Label/LabelComponent';
import { DropdownProps } from './DropdownProps';
import './Dropdown.less';

const DropdownComponent: React.FC<DropdownProps<string | number>> = ({
  label,
  name,
  options,
  updated,
}) => {
  return (
    <div className='dropdown-container'>
      <LabelComponent label={label} />
      <Field as='select' name={name} onChange={(e: string) => updated(e)}>
        {options.map((option) => {
          return (
            <option value={option.value} key={option.value}>
              {option.viewValue}
            </option>
          );
        })}
      </Field>
    </div>
  );
};

export { DropdownComponent };
