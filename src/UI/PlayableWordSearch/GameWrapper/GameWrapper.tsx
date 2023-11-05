import * as React from 'react';
import { PlayableWordSearchContext } from '../PlayableWordSearchContext';

const GameWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { tableWidth } = React.useContext(PlayableWordSearchContext);

  return (
    <div className='game' style={{ width: tableWidth }}>
      {children}
    </div>
  );
};

export { GameWrapper };
