import * as React from 'react';
import { CardProps } from './CardProps';
import './ReactCard.less';

export const CardComponent: React.FC<React.PropsWithChildren<CardProps>> = ({
  children,
  title,
}) => (
  <div className='card'>
    {title ? <div className='card-title'>{title}</div> : null}
    <div className='card-content'>{children}</div>
  </div>
);
