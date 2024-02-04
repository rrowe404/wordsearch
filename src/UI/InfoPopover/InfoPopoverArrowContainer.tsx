import * as React from 'react';
import { ArrowContainerProps, useArrowContainer } from 'react-tiny-popover';

type Props = React.PropsWithChildren<
  Pick<ArrowContainerProps, 'childRect' | 'popoverRect' | 'position'>
>;

const InfoPopoverArrowContainer: React.FC<Props> = ({
  children,
  childRect,
  popoverRect,
  position,
}) => {
  const { arrowContainerStyle, arrowStyle } = useArrowContainer({
    childRect,
    popoverRect,
    position,
    arrowColor: '#222',
    arrowSize: 12,
  });

  return (
    <div style={arrowContainerStyle}>
      <div style={arrowStyle} />
      {children}
    </div>
  );
};

export { InfoPopoverArrowContainer };
