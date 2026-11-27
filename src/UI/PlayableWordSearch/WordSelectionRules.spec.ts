import { Position } from 'src/Rules/Position/Position';
import {
  DRAG_GRACE_AREA,
  getDragSelection,
  isWithinDragGraceArea,
} from './WordSelectionRules';

describe('WordSelectionRules', () => {
  it('selects horizontal positions', () => {
    expect(getDragSelection({ row: 1, column: 1 }, { row: 1, column: 4 }))
      .toEqual([
        { row: 1, column: 1 },
        { row: 1, column: 2 },
        { row: 1, column: 3 },
        { row: 1, column: 4 },
      ]);
  });

  it('selects vertical positions', () => {
    expect(getDragSelection({ row: 4, column: 2 }, { row: 1, column: 2 }))
      .toEqual([
        { row: 4, column: 2 },
        { row: 3, column: 2 },
        { row: 2, column: 2 },
        { row: 1, column: 2 },
      ]);
  });

  it('selects diagonal positions', () => {
    expect(getDragSelection({ row: 0, column: 0 }, { row: 3, column: 3 }))
      .toEqual([
        { row: 0, column: 0 },
        { row: 1, column: 1 },
        { row: 2, column: 2 },
        { row: 3, column: 3 },
      ]);
  });

  it('selects reversed and anti-diagonal positions', () => {
    expect(getDragSelection({ row: 1, column: 4 }, { row: 1, column: 1 }))
      .toEqual([
        { row: 1, column: 4 },
        { row: 1, column: 3 },
        { row: 1, column: 2 },
        { row: 1, column: 1 },
      ]);
    expect(getDragSelection({ row: 2, column: 4 }, { row: 0, column: 2 }))
      .toEqual([
        { row: 2, column: 4 },
        { row: 1, column: 3 },
        { row: 0, column: 2 },
      ]);
    expect(getDragSelection({ row: 0, column: 3 }, { row: 2, column: 1 }))
      .toEqual([
        { row: 0, column: 3 },
        { row: 1, column: 2 },
        { row: 2, column: 1 },
      ]);
  });

  it('selects only one position when the endpoint does not move', () => {
    expect(getDragSelection(
      { row: 1, column: 1 },
      { row: 1, column: 1 }
    )).toEqual([{ row: 1, column: 1 }]);
  });

  it('does not select invalid non-linear positions', () => {
    expect(getDragSelection({ row: 0, column: 0 }, { row: 2, column: 3 }))
      .toEqual([{ row: 0, column: 0 }]);
  });

  it('includes grace-area boundaries', () => {
    const bounds = {
      left: 100,
      right: 400,
      top: 100,
      bottom: 200,
    } as DOMRect;

    expect(isWithinDragGraceArea(
      bounds.right + DRAG_GRACE_AREA,
      bounds.top - DRAG_GRACE_AREA,
      bounds
    )).toBe(true);
    expect(isWithinDragGraceArea(
      bounds.right + DRAG_GRACE_AREA + 1,
      bounds.top,
      bounds
    )).toBe(false);
  });

  it('includes all grace-area edges and excludes points beyond them', () => {
    const bounds = {
      left: 100,
      right: 400,
      top: 100,
      bottom: 200,
    } as DOMRect;

    expect(isWithinDragGraceArea(bounds.left - DRAG_GRACE_AREA, 150, bounds))
      .toBe(true);
    expect(isWithinDragGraceArea(bounds.right + DRAG_GRACE_AREA, 150, bounds))
      .toBe(true);
    expect(isWithinDragGraceArea(250, bounds.top - DRAG_GRACE_AREA, bounds))
      .toBe(true);
    expect(isWithinDragGraceArea(250, bounds.bottom + DRAG_GRACE_AREA, bounds))
      .toBe(true);
    expect(isWithinDragGraceArea(bounds.left - DRAG_GRACE_AREA - 1, 150, bounds))
      .toBe(false);
    expect(isWithinDragGraceArea(250, bounds.bottom + DRAG_GRACE_AREA + 1, bounds))
      .toBe(false);
  });

  it('clips selections that overflow the grid', () => {
    const bounds = { rowCount: 3, columnCount: 3 };

    expect(getDragSelection(
      { row: 1, column: 1 },
      { row: -2, column: -2 },
      bounds
    )).toEqual([
      { row: 1, column: 1 },
      { row: 0, column: 0 },
    ]);
  });

  it('clips an overflow to the end of the grid', () => {
    const bounds = { rowCount: 3, columnCount: 3 };

    expect(getDragSelection(
      { row: 1, column: 1 },
      { row: 5, column: 5 } as Position,
      bounds
    )).toEqual([
      { row: 1, column: 1 },
      { row: 2, column: 2 },
    ]);
  });
});
