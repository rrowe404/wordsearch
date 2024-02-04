import * as React from 'react';
import { Popover, PopoverProps } from 'react-tiny-popover';
import './InfoPopover.less';
import { InfoPopoverArrowContainer } from './InfoPopoverArrowContainer';

interface Props extends Pick<PopoverProps, 'containerClassName'> {
  displayText: string;
  textClassName: string;
}

const InfoPopover: React.FC<Props> = ({
  containerClassName,
  displayText,
  textClassName,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>();

  return (
    <Popover
      containerClassName={containerClassName}
      positions={['right', 'bottom', 'top']}
      isOpen={isPopoverOpen}
      content={({ position, childRect, popoverRect }) => (
        <InfoPopoverArrowContainer
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
        >
          <div className={textClassName}>{displayText}</div>
        </InfoPopoverArrowContainer>
      )}
      padding={10}
      parentElement={ref?.current?.parentElement}
      ref={ref}
    >
      <div
        className='trigger'
        tabIndex={0}
        onBlur={() => setIsPopoverOpen(false)}
        onFocus={() => setIsPopoverOpen(true)}
        onMouseEnter={() => setIsPopoverOpen(true)}
        onMouseLeave={() => setIsPopoverOpen(false)}
      >
        ?
      </div>
    </Popover>
  );
};

export { InfoPopover };
