import * as React from 'react';
import { InputProps } from './InputProps';
import { Field } from 'formik';
import { LabelComponent } from '../Label/LabelComponent';
import * as _ from 'lodash';
import { CustomErrorMessage } from '../CustomErrorMessage/CustomErrorMessage';
import './ReactInput.less';

const InputComponent: React.FC<InputProps<any>> = ({
  autofocus,
  inputType = 'text',
  label,
  name,
  updated,
  validate = () => null,
  value,
}) => {
  const hasAutofocused = React.useRef(false);

  function doAutofocus(ref) {
    if (ref && autofocus && !hasAutofocused.current) {
      ref.focus();
      hasAutofocused.current = true;
    }
  }

  return (
    <div className='input-container'>
      <LabelComponent label={label} />
      <Field
        innerRef={(ref) => doAutofocus(ref)}
        onChange={(e) => updated(e)}
        type={inputType}
        name={name}
        value={value}
        validate={(val) => validate(val)}
      ></Field>
      <CustomErrorMessage name={name} />
    </div>
  );
};

export { InputComponent };
