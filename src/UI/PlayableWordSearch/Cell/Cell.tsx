import * as React from 'react';
import { Position } from 'src/Rules/Position/Position';
import { PlayableWordSearchContext } from '../PlayableWordSearchContext';

interface Props {
  onClick: () => void;
  className: string;
  value: string;
}

const Cell: React.FC<Props> = ({ onClick, className, value }) => {
  const { letterSize } = React.useContext(PlayableWordSearchContext);

  const getTdStyles = () => {
    return {
      width: letterSize,
      height: letterSize,
    };
  };

  return (
    <div onClick={() => onClick()} className={className} style={getTdStyles()}>
      {value}
    </div>
  );
};

export { Cell };
