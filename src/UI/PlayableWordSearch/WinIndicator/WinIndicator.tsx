import * as React from 'react';

interface Props {
  className: string;
}

const WinIndicator: React.FC<Props> = ({ className }) => {
  return <div className={className}>WINNER</div>;
};

export { WinIndicator };
