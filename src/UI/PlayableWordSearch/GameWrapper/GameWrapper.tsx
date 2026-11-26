import * as React from 'react';
import { PlayableWordSearchContext } from '../PlayableWordSearchContext';

interface Props extends React.PropsWithChildren {
  onMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const GameWrapper: React.FC<Props> = ({ children, onMouseLeave }) => {
  const { tableWidth } = React.useContext(PlayableWordSearchContext);

  return (
    <div
      className='game'
      onMouseLeave={onMouseLeave}
      style={{ maxWidth: tableWidth }}
    >
      {children}
    </div>
  );
};

export { GameWrapper };
