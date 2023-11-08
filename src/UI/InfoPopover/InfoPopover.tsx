import * as React from 'react';
import { ArrowContainer, Popover, PopoverProps } from 'react-tiny-popover';
import './InfoPopover.less';

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
        <ArrowContainer
          arrowColor='#222'
          arrowSize={12}
          position={position}
          childRect={childRect}
          popoverRect={popoverRect}
        >
          <div className={textClassName}>{displayText}</div>
        </ArrowContainer>
      )}
      padding={10}
      ref={ref}
      // transform={{ top, left }}
    >
      <div
        className='trigger'
        onMouseEnter={() => setIsPopoverOpen(true)}
        onMouseLeave={() => setIsPopoverOpen(false)}
      >
        ?
      </div>
    </Popover>
  );
};

export { InfoPopover };
