import * as React from 'react';
import { ButtonProps } from './ButtonProps';
import './Button.less';

const ButtonComponent: React.FC<ButtonProps> = ({
  buttonType,
  color = 'primary',
  disabled,
  text,
}) => {
  return (
    <button type={buttonType} className={color} disabled={disabled}>
      {text}
    </button>
  );
};

export { ButtonComponent };
