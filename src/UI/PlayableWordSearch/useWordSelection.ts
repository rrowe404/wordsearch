import * as React from 'react';
import { PendingLetterTracker } from 'src/Rules/PendingLetterTracker/usePendingLetterTracker';
import { Position } from 'src/Rules/Position/Position';
import {
  getDragSelection,
  getPositionKey,
  isWithinDragGraceArea,
  SelectionGridBounds,
} from './WordSelectionRules';

export type WordSelectionPhase =
  | 'idle'
  | 'selecting'
  | 'grace-area'
  | 'selected'
  | 'cancelled';

export interface WordSelection {
  phase: WordSelectionPhase;
  dragSelection: Position[];
  dragSelectionKeys: ReadonlySet<string>;
  markLetter: (position: Position) => void;
  startDrag: (position: Position, pointerId: number) => void;
  endDrag: (position: Position, pointerId: number) => void;
  cancelDrag: (pointerId?: number) => void;
  updateDrag: (position: Position, pointerId: number) => void;
  onGamePointerLeave: (event: React.PointerEvent<HTMLDivElement>) => void;
  onGamePointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
}

export const useWordSelection = (
  startLetterTracker: PendingLetterTracker,
  endLetterTracker: PendingLetterTracker,
  gridBounds?: SelectionGridBounds
): WordSelection => {
  const [phase, setPhase] = React.useState<WordSelectionPhase>('idle');
  const [dragPosition, setDragPosition] = React.useState<Position>(null);
  const [dragBounds, setDragBounds] = React.useState<DOMRect>(null);
  const dragStartRef = React.useRef<Position>(null);
  const dragPositionRef = React.useRef<Position>(null);
  const activePointerIdRef = React.useRef<number>(null);
  const ignoreNextClickRef = React.useRef(false);

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
    setPhase('cancelled');
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
    setPhase('selecting');
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
    setPhase('selected');

    if (
      start &&
      (start.row !== end.row || start.column !== end.column)
    ) {
      startLetterTracker.setPending(start);
      endLetterTracker.setPending(end);
      ignoreNextClickRef.current = true;
    }
  };

  const updateDrag = (position: Position, pointerId: number) => {
    if (activePointerIdRef.current === pointerId && dragStartRef.current) {
      dragPositionRef.current = position;
      setDragPosition(position);
    }
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
      setPhase('grace-area');
    } else {
      cancelDrag(event.pointerId);
    }
  };

  const getCellAtPoint = (
    container: Element,
    clientX: number,
    clientY: number
  ): HTMLElement | null => {
    const target =
      typeof document.elementFromPoint === 'function'
        ? document.elementFromPoint(clientX, clientY)
        : null;
    const cell =
      target instanceof Element ? target.closest<HTMLElement>('.cell') : null;
    return cell && container.contains(cell) ? cell : null;
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
        setPhase('grace-area');
      } else {
        cancelDrag(event.pointerId);
      }
      return;
    }

    setDragBounds(null);
    setPhase('selecting');

    const cell = getCellAtPoint(
      event.currentTarget,
      event.clientX,
      event.clientY
    );
    if (cell) {
      const row = Number(cell.dataset.row);
      const column = Number(cell.dataset.column);

      if (Number.isInteger(row) && Number.isInteger(column)) {
        updateDrag({ row, column }, event.pointerId);
      }
    }
  };

  React.useEffect(() => {
    if (activePointerIdRef.current === null) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerId !== activePointerIdRef.current) {
        return;
      }

      if (
        dragBounds &&
        !isWithinDragGraceArea(event.clientX, event.clientY, dragBounds)
      ) {
        cancelDrag(event.pointerId);
        return;
      }

      if (typeof document.elementFromPoint !== 'function') {
        return;
      }

      const target = document.elementFromPoint(event.clientX, event.clientY);
      const cell =
        target instanceof Element
          ? target.closest<HTMLElement>('.cell')
          : null;
      if (cell) {
        const row = Number(cell.dataset.row);
        const column = Number(cell.dataset.column);
        if (Number.isInteger(row) && Number.isInteger(column)) {
          updateDrag({ row, column }, event.pointerId);
          setDragBounds(null);
          setPhase('selecting');
        }
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
  }, [dragBounds, phase]);

  const dragSelection = React.useMemo(
    () =>
      dragStartRef.current && dragPosition
        ? getDragSelection(dragStartRef.current, dragPosition, gridBounds)
        : [],
    [dragPosition, gridBounds]
  );
  const dragSelectionKeys = React.useMemo(
    () => new Set(dragSelection.map(getPositionKey)),
    [dragSelection]
  );

  return {
    phase,
    dragSelection,
    dragSelectionKeys,
    markLetter,
    startDrag,
    endDrag,
    cancelDrag,
    updateDrag,
    onGamePointerLeave,
    onGamePointerMove,
  };
};
