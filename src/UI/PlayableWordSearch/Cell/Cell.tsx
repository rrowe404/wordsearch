import * as React from 'react';
import { Position } from 'src/Rules/Position/Position';
import { PlayableWordSearchContext } from '../PlayableWordSearchContext';

interface Props {
  onClick: () => void;
  position: Position;
}

const Cell: React.FC<Props> = ({ onClick, position }) => {
  const { row, column } = position;
  const { letterSize, letterTracker, startLetterTracker, wordSearchState } =
    React.useContext(PlayableWordSearchContext);

  const getTdClasses = () => {
    let result = ['cell'];

    if (letterTracker.isLetterComplete(position)) {
      result.push('completed');
    }

    if (startLetterTracker.isPending(position)) {
      result.push('pending');
    }

    return result.join(' ');
  };

  const getTdStyles = () => {
    return {
      width: letterSize,
      height: letterSize,
    };
  };

  return (
    <div
      onClick={() => onClick()}
      className={getTdClasses()}
      style={getTdStyles()}
    >
      {wordSearchState.getValueAt(row, column)}
    </div>
  );
};

export { Cell };
