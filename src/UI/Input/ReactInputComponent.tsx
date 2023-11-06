import * as React from 'react';
import { InputProps } from './InputProps';
import { Field } from 'formik';
import { LabelComponent } from '../Label/LabelComponent';
import { CustomErrorMessage } from '../CustomErrorMessage/CustomErrorMessage';
import './ReactInput.less';

const InputComponent: React.FC<InputProps<unknown>> = ({
  autofocus,
  inputType = 'text',
  label,
  name,
  updated,
  validate,
  value,
}) => {
  const hasAutofocused = React.useRef(false);

  function doAutofocus(ref: HTMLInputElement) {
    if (ref && autofocus && !hasAutofocused.current) {
      ref.focus();
      hasAutofocused.current = true;
    }
  }

  return (
    <div className='input-container'>
      <LabelComponent label={label} />
      <Field
        innerRef={(ref: HTMLInputElement) => doAutofocus(ref)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updated(e)}
        type={inputType}
        name={name}
        value={value}
        validate={(val: string) => validate && validate(val)}
      ></Field>
      <CustomErrorMessage name={name} />
    </div>
  );
};

export { InputComponent };
