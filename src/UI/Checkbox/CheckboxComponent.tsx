import * as React from 'react';
import { CheckboxProps } from './CheckboxProps';
import './CheckboxStyles.less';

const CheckboxComponent: React.FC<CheckboxProps> = ({
  label,
  name,
  updated,
  value,
}) => {
  const [checked, setChecked] = React.useState(value);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setChecked(e.target.checked);
    updated(e);
  }

  return (
    <div className='checkboxContainer'>
      <input
        onChange={(e) => handleChange(e)}
        tabIndex={0}
        type='checkbox'
        name={name}
        id={name}
        checked={checked}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export { CheckboxComponent };
