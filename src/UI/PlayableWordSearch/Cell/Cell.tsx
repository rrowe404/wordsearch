import * as React from 'react';
import { Position } from 'src/Rules/Position/Position';
import { PlayableWordSearchContext } from '../PlayableWordSearchContext';

interface Props {
  onClick: () => void;
  className: string;
  style: React.CSSProperties;
  value: string;
}

const Cell: React.FC<Props> = ({ onClick, className, style, value }) => {
  return (
    <div onClick={() => onClick()} className={className} style={style}>
      {value}
    </div>
  );
};

export { Cell };
