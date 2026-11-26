import * as React from 'react';
import { Position } from 'src/Rules/Position/Position';
import { PlayableWordSearchContext } from '../PlayableWordSearchContext';

interface Props {
  onClick: () => void;
  onPointerDown: (pointerId: number) => void;
  onPointerEnter: (pointerId: number) => void;
  onPointerUp: (pointerId: number) => void;
  isDragPending: boolean;
  position: Position;
}

const Cell: React.FC<Props> = ({
  onClick,
  onPointerDown,
  onPointerEnter,
  onPointerUp,
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
      onPointerDown={(event) => {
        if (event.button === 0 && event.isPrimary) {
          event.preventDefault();
          onPointerDown(event.pointerId);
        }
      }}
      onPointerEnter={(event) => onPointerEnter(event.pointerId)}
      onPointerUp={(event) => onPointerUp(event.pointerId)}
      onDragStart={(event) => event.preventDefault()}
      onClick={() => onClick()}
      className={getTdClasses()}
      style={getTdStyles()}
      draggable={false}
      data-row={row}
      data-column={column}
    >
      {wordSearchState.getValueAt(row, column)}
    </div>
  );
};

export { Cell };
