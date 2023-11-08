import * as React from 'react';
import { InfoPopover } from '../InfoPopover/InfoPopover';
import { CardProps } from './CardProps';
import './ReactCard.less';

export const CardComponent: React.FC<React.PropsWithChildren<CardProps>> = ({
  children,
  popoverText,
  title,
}) => {
  return (
    <div className='card'>
      {title ? (
        <div className='card-title'>
          {title}
          {popoverText && (
            <InfoPopover
              containerClassName='card-popover'
              displayText={popoverText}
              textClassName='card-popover-text'
            />
          )}
        </div>
      ) : null}
      <div className='card-content'>{children}</div>
    </div>
  );
};
