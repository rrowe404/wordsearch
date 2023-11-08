import * as React from 'react';
import { InputProps } from './InputProps';
import { Field } from 'formik';
import { LabelComponent } from '../Label/LabelComponent';
import { CustomErrorMessage } from '../CustomErrorMessage/CustomErrorMessage';
import './ReactInput.less';

const InputComponent: React.FC<InputProps<unknown>> = ({
  as = 'input',
  autofocus,
  inputType = 'text',
  label,
  min,
  max,
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
        as={as}
        innerRef={(ref: HTMLInputElement) => doAutofocus(ref)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updated(e)}
        type={inputType}
        min={min}
        max={max}
        name={name}
        value={value}
        validate={(val: string) => validate && validate(val)}
      ></Field>
      {inputType === 'range' && (
        <span className='input-range-value'>{value as number}</span>
      )}
      <CustomErrorMessage name={name} />
    </div>
  );
};

export { InputComponent };
