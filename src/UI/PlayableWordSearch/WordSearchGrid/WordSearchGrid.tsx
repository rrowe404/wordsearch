import * as React from 'react';
import { Position } from 'src/Rules/Position/Position';
import { Cell } from '../Cell/Cell';
import { WordSelection } from '../useWordSelection';
import { getPositionKey } from '../WordSelectionRules';

interface Props {
  wordSelection: WordSelection;
  rows: number[];
  columns: number[];
}

const WordSearchGrid: React.FC<Props> = ({
  wordSelection,
  rows,
  columns,
}) => {
  const isDragPending = (position: Position) =>
    wordSelection.dragSelectionKeys.has(getPositionKey(position));

  return (
    <>
      {rows.map((row) => (
        <div className='row' key={row}>
          {columns.map((column) => {
            const position = { row, column };

            return (
              <Cell
                key={`${row}-${column}`}
                onClick={() => wordSelection.markLetter(position)}
                onPointerDown={(pointerId) =>
                  wordSelection.startDrag(position, pointerId)
                }
                onPointerEnter={(pointerId) =>
                  wordSelection.updateDrag(position, pointerId)
                }
                onPointerUp={(pointerId) =>
                  wordSelection.endDrag(position, pointerId)
                }
                isDragPending={isDragPending(position)}
                position={position}
              />
            );
          })}
        </div>
      ))}
    </>
  );
};

export { Props, WordSearchGrid };
