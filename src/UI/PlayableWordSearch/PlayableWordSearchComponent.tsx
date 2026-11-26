import * as React from 'react';
import { WordBuilderService } from 'src/Rules/WordBuilder/WordBuilderService';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { SizeTrackerComponent } from '../SizeTracker/SizeTrackerComponent';
import { SizeTrackerResize } from '../SizeTracker/SizeTrackerResize';
import { Cell } from './Cell/Cell';
import { GameWrapper } from './GameWrapper/GameWrapper';
import { PlayableWordSearchContextProvider } from './PlayableWordSearchContextProvider';
import { getSize } from './PlayableWordSearchSizeHelper';
import { Title } from './Title/Title';
import { WinIndicator } from './WinIndicator/WinIndicator';
import { WordList } from './WordList/WordList';
import { WordListContainer } from './WordList/WordListContainer';
import './PlayableWordSearchComponent.less';
import { usePendingLetterTracker } from 'src/Rules/PendingLetterTracker/usePendingLetterTracker';
import { useLetterTracker } from 'src/Rules/LetterTracker/useLetterTracker';
import { useWordTracker } from 'src/Rules/WordTracker/useWordTracker';
import { Position } from 'src/Rules/Position/Position';

// these are kinda magical, just numbers that feel good
const MIN_LETTER_SIZE = 10;
const MAX_LETTER_SIZE = 50;
const DRAG_GRACE_AREA = 12;

const wordBuilderService = new WordBuilderService();

const getDragSelection = (start: Position, end: Position): Position[] => {
  const rowDistance = end.row - start.row;
  const columnDistance = end.column - start.column;
  const distance = Math.max(Math.abs(rowDistance), Math.abs(columnDistance));

  if (
    rowDistance !== 0 &&
    columnDistance !== 0 &&
    Math.abs(rowDistance) !== Math.abs(columnDistance)
  ) {
    return [start];
  }

  const rowStep = Math.sign(rowDistance);
  const columnStep = Math.sign(columnDistance);

  return Array.from({ length: distance + 1 }, (_, step) => ({
    row: start.row + rowStep * step,
    column: start.column + columnStep * step,
  }));
};

const isWithinDragGraceArea = (
  x: number,
  y: number,
  bounds: DOMRect
): boolean =>
  x >= bounds.left - DRAG_GRACE_AREA &&
  x <= bounds.right + DRAG_GRACE_AREA &&
  y >= bounds.top - DRAG_GRACE_AREA &&
  y <= bounds.bottom + DRAG_GRACE_AREA;

interface Props {
  wordSearchState: WordSearchState;
}

const PlayableWordSearch: React.FC<Props> = ({ wordSearchState }) => {
  const [letterSize, setLetterSize] = React.useState(0);
  const [tableWidth, setTableWidth] = React.useState(0);
  const [dragPosition, setDragPosition] = React.useState<Position>(null);
  const [dragBounds, setDragBounds] = React.useState<DOMRect>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);
  const wordListRef = React.useRef<HTMLDivElement>(null);
  const dragStartRef = React.useRef<Position>(null);
  const dragPositionRef = React.useRef<Position>(null);
  const activePointerIdRef = React.useRef<number>(null);
  const ignoreNextClickRef = React.useRef(false);
  const size = getSize(wordSearchState);
  const { columns, wordList } = wordSearchState;
  const wordTracker = useWordTracker(wordList);
  const letterTracker = useLetterTracker();
  const startLetterTracker = usePendingLetterTracker();
  const endLetterTracker = usePendingLetterTracker();

  const connectWord = () => {
    if (!startLetterTracker.hasPending() || !endLetterTracker.hasPending()) {
      return;
    }

    const wordBuilderResult = wordBuilderService.build(
      wordSearchState,
      startLetterTracker.pending,
      endLetterTracker.pending
    );

    const accuratelyCasedWord = getAccuratelyCasedWord(wordBuilderResult?.word);

    if (accuratelyCasedWord) {
      wordTracker.completeWord(accuratelyCasedWord);
      letterTracker.completeLetters(...wordBuilderResult.lettersWithPositions);
    }

    startLetterTracker.clear();
    endLetterTracker.clear();
  };

  React.useEffect(() => {
    connectWord();
  }, [startLetterTracker.pending, endLetterTracker.pending]);

  const onResize = React.useCallback(
    (resize: SizeTrackerResize) => {
      // gotta fit, so take the smaller of the two
      let basis = Math.floor(Math.min(resize.width, resize.height));

      // if the height is what is restricting us, we need to account for title/wordlist height too
      if (basis === Math.floor(resize.height)) {
        const titleHeight = titleRef?.current?.clientHeight ?? 0;
        const wordListHeight = wordListRef?.current?.clientHeight ?? 0;

        basis -= titleHeight + wordListHeight;
      }

      let newLetterSize = Math.floor(basis / columns);

      // max size
      newLetterSize = Math.min(newLetterSize, MAX_LETTER_SIZE);

      // normalize
      newLetterSize = Math.max(newLetterSize, MIN_LETTER_SIZE);

      // in this case, the table doesn't need the whole space to render
      // so we need to recalculate the basis to make the width is correct
      if (newLetterSize === MAX_LETTER_SIZE) {
        basis = newLetterSize * columns;
      }

      if (newLetterSize !== letterSize) {
        setTableWidth(basis);
        setLetterSize(newLetterSize);
      }
    },
    [columns]
  );

  const getAccuratelyCasedWord = (offcasedWord: string) => {
    if (!offcasedWord) {
      return null;
    }

    const index = wordList.findIndex(
      (word) => word.toLowerCase() === offcasedWord.toLowerCase()
    );

    if (index > -1) {
      return wordList[index];
    }

    return '';
  };

  const markLetter = (position: Position) => {
    if (ignoreNextClickRef.current) {
      ignoreNextClickRef.current = false;
      return;
    }

    if (startLetterTracker.hasPending()) {
      endLetterTracker.setPending(position);
    } else {
      startLetterTracker.setPending(position);
    }
  };

  const startDrag = (position: Position, pointerId: number) => {
    if (activePointerIdRef.current !== null) {
      return;
    }

    ignoreNextClickRef.current = false;
    activePointerIdRef.current = pointerId;
    dragStartRef.current = position;
    dragPositionRef.current = position;
    setDragPosition(position);
  };

  const endDrag = (position: Position, pointerId: number) => {
    if (activePointerIdRef.current !== pointerId) {
      return;
    }

    const start = dragStartRef.current;
    const end = dragPositionRef.current ?? position;
    activePointerIdRef.current = null;
    dragStartRef.current = null;
    dragPositionRef.current = null;
    setDragPosition(null);
    setDragBounds(null);

    if (
      start &&
      (start.row !== end.row || start.column !== end.column)
    ) {
      startLetterTracker.setPending(start);
      endLetterTracker.setPending(end);
      ignoreNextClickRef.current = true;
    }
  };

  const cancelDrag = (pointerId?: number) => {
    if (
      pointerId !== undefined &&
      activePointerIdRef.current !== pointerId
    ) {
      return;
    }

    activePointerIdRef.current = null;
    dragStartRef.current = null;
    dragPositionRef.current = null;
    setDragPosition(null);
    setDragBounds(null);
  };

  const onGamePointerLeave = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (activePointerIdRef.current !== event.pointerId) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    if (isWithinDragGraceArea(event.clientX, event.clientY, bounds)) {
      setDragBounds(bounds);
    } else {
      cancelDrag(event.pointerId);
    }
  };

  const updateDrag = (position: Position, pointerId: number) => {
    if (activePointerIdRef.current === pointerId && dragStartRef.current) {
      dragPositionRef.current = position;
      setDragPosition(position);
    }
  };

  const onGamePointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (activePointerIdRef.current !== event.pointerId) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const isInsideGame =
      event.clientX >= bounds.left &&
      event.clientX <= bounds.right &&
      event.clientY >= bounds.top &&
      event.clientY <= bounds.bottom;

    if (!isInsideGame) {
      if (isWithinDragGraceArea(event.clientX, event.clientY, bounds)) {
        setDragBounds((currentBounds) => currentBounds ?? bounds);
      } else {
        cancelDrag(event.pointerId);
      }

      return;
    }

    setDragBounds(null);

    const target =
      typeof document.elementFromPoint === 'function'
        ? document.elementFromPoint(event.clientX, event.clientY)
        : event.target;
    const cell =
      target instanceof Element
        ? target.closest<HTMLElement>('.cell')
        : null;

    if (cell && event.currentTarget.contains(cell)) {
      const row = Number(cell.dataset.row);
      const column = Number(cell.dataset.column);

      if (Number.isInteger(row) && Number.isInteger(column)) {
        updateDrag({ row, column }, event.pointerId);
      }
    }
  };

  React.useEffect(() => {
    if (!dragBounds || !dragStartRef.current) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (
        event.pointerId === activePointerIdRef.current &&
        !isWithinDragGraceArea(event.clientX, event.clientY, dragBounds)
      ) {
        cancelDrag(event.pointerId);
      }
    };
    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerId !== activePointerIdRef.current) {
        return;
      }

      const position = dragPositionRef.current;
      if (position) {
        endDrag(position, event.pointerId);
      } else {
        cancelDrag(event.pointerId);
      }
    };
    const handlePointerCancel = (event: PointerEvent) =>
      cancelDrag(event.pointerId);

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerCancel);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerCancel);
    };
  }, [dragBounds]);

  const dragSelection =
    dragStartRef.current && dragPosition
      ? getDragSelection(dragStartRef.current, dragPosition)
      : [];

  const winner = wordTracker.isComplete();

  return (
    <SizeTrackerComponent
      className='full-height full-width'
      onResize={(resize) => onResize(resize)}
    >
      <PlayableWordSearchContextProvider
        letterSize={letterSize}
        letterTracker={letterTracker}
        startLetterTracker={startLetterTracker}
        tableWidth={tableWidth}
        wordSearchState={wordSearchState}
        wordTracker={wordTracker}
      >
        <div className='playable'>
          <Title ref={titleRef} />
          <GameWrapper
            onPointerCancel={(event) => cancelDrag(event.pointerId)}
            onPointerLeave={onGamePointerLeave}
            onPointerMove={onGamePointerMove}
          >
            {size.rows.map((row) => {
              return (
                <div className='row' key={row}>
                  {size.columns.map((column) => {
                    const position = { row, column };

                    return (
                      <Cell
                        key={`${row}-${column}`}
                        onClick={() => markLetter(position)}
                        onPointerDown={(pointerId) =>
                          startDrag(position, pointerId)
                        }
                        onPointerEnter={(pointerId) =>
                          updateDrag(position, pointerId)
                        }
                        onPointerUp={(pointerId) =>
                          endDrag(position, pointerId)
                        }
                        isDragPending={dragSelection.some(
                          (selected) =>
                            selected.row === row && selected.column === column
                        )}
                        position={position}
                      />
                    );
                  })}
                </div>
              );
            })}
          </GameWrapper>

          <WordListContainer ref={wordListRef}>
            <WordList />
          </WordListContainer>
          {winner && <WinIndicator className='win' />}
        </div>
      </PlayableWordSearchContextProvider>
    </SizeTrackerComponent>
  );
};

export { PlayableWordSearch as PlayableWordSearchComponent };
