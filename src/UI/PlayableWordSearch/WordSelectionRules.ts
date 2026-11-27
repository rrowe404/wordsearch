import { Position } from 'src/Rules/Position/Position';

export const DRAG_GRACE_AREA = 12;

export interface SelectionGridBounds {
  rowCount: number;
  columnCount: number;
}

export const getPositionKey = ({ row, column }: Position): string =>
  `${row}-${column}`;

export const getDragSelection = (
  start: Position,
  end: Position,
  bounds?: SelectionGridBounds
): Position[] => {
  const rowDistance = end.row - start.row;
  const columnDistance = end.column - start.column;
  const distance = Math.max(
    Math.abs(rowDistance),
    Math.abs(columnDistance)
  );

  if (
    rowDistance !== 0 &&
    columnDistance !== 0 &&
    Math.abs(rowDistance) !== Math.abs(columnDistance)
  ) {
    return isWithinGrid(start, bounds) ? [start] : [];
  }

  const rowStep = Math.sign(rowDistance);
  const columnStep = Math.sign(columnDistance);

  return Array.from({ length: distance + 1 }, (_, step) => ({
    row: start.row + rowStep * step,
    column: start.column + columnStep * step,
  })).filter((position) => isWithinGrid(position, bounds));
};

export const isWithinDragGraceArea = (
  x: number,
  y: number,
  bounds: DOMRect
): boolean =>
  x >= bounds.left - DRAG_GRACE_AREA &&
  x <= bounds.right + DRAG_GRACE_AREA &&
  y >= bounds.top - DRAG_GRACE_AREA &&
  y <= bounds.bottom + DRAG_GRACE_AREA;

const isWithinGrid = (
  position: Position,
  bounds?: SelectionGridBounds
): boolean =>
  !bounds ||
  (position.row >= 0 &&
    position.row < bounds.rowCount &&
    position.column >= 0 &&
    position.column < bounds.columnCount);
