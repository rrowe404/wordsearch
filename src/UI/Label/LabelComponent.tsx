import * as React from 'react';
import { LabelProps } from './LabelProps';

const LabelComponent: React.FC<LabelProps> = ({ label }) => {
  if (!label) {
    return null;
  }

  return <label>{label}</label>;
};

export { LabelComponent };
