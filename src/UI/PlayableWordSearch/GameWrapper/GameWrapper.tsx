import * as React from 'react';
import { PlayableWordSearchContext } from '../PlayableWordSearchContext';

interface Props extends React.PropsWithChildren {
  onPointerLeave: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerCancel: (event: React.PointerEvent<HTMLDivElement>) => void;
}

const GameWrapper: React.FC<Props> = ({
  children,
  onPointerLeave,
  onPointerMove,
  onPointerCancel,
}) => {
  const { tableWidth } = React.useContext(PlayableWordSearchContext);

  return (
    <div
      className='game'
      onPointerLeave={onPointerLeave}
      onPointerMove={onPointerMove}
      onPointerCancel={onPointerCancel}
      style={{ maxWidth: tableWidth }}
    >
      {children}
    </div>
  );
};

export { GameWrapper };
