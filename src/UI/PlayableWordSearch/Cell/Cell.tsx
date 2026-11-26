import * as React from 'react';
import { Position } from 'src/Rules/Position/Position';
import { PlayableWordSearchContext } from '../PlayableWordSearchContext';

interface Props {
  onClick: () => void;
  onMouseDown: () => void;
  onMouseEnter: () => void;
  onMouseUp: () => void;
  isDragPending: boolean;
  position: Position;
}

const Cell: React.FC<Props> = ({
  onClick,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  isDragPending,
  position,
}) => {
  const { row, column } = position;
  const { letterSize, letterTracker, startLetterTracker, wordSearchState } =
    React.useContext(PlayableWordSearchContext);

  const getTdClasses = () => {
    const result = ['cell'];

    if (letterTracker.isLetterComplete(position)) {
      result.push('completed');
    }

    if (startLetterTracker.isPending(position) || isDragPending) {
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
      onMouseDown={(event) => {
        if (event.button === 0) {
          event.preventDefault();
          onMouseDown();
        }
      }}
      onMouseEnter={() => onMouseEnter()}
      onMouseUp={(event) => {
        if (event.button === 0) {
          onMouseUp();
        }
      }}
      onDragStart={(event) => event.preventDefault()}
      onClick={() => onClick()}
      className={getTdClasses()}
      style={getTdStyles()}
      draggable={false}
    >
      {wordSearchState.getValueAt(row, column)}
    </div>
  );
};

export { Cell };
