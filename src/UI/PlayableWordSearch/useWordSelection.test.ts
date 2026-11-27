/**
 * @jest-environment jsdom
 */

import { act, renderHook } from '@testing-library/react';
import { PendingLetterTracker } from 'src/Rules/PendingLetterTracker/usePendingLetterTracker';
import { Position } from 'src/Rules/Position/Position';
import { useWordSelection } from './useWordSelection';

const createPendingTracker = (): PendingLetterTracker => {
  let pending: Position = null;

  return {
    pending,
    clear: () => {
      pending = null;
    },
    hasPending: () => pending !== null,
    isPending: (position: Position) =>
      position &&
      pending &&
      position.row === pending.row &&
      position.column === pending.column,
    setPending: (value) => {
      pending =
        typeof value === 'function'
          ? value(pending)
          : value;
    },
  };
};

const renderSelectionHook = () =>
  renderHook(() =>
    useWordSelection(createPendingTracker(), createPendingTracker(), {
      rowCount: 3,
      columnCount: 3,
    })
  );

const fireWindowPointer = (
  type: 'pointermove' | 'pointerup' | 'pointercancel',
  pointerId: number,
  clientX = 200,
  clientY = 200
) => {
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.defineProperties(event, {
    pointerId: { value: pointerId },
    clientX: { value: clientX },
    clientY: { value: clientY },
  });
  window.dispatchEvent(event);
};

describe('useWordSelection pointer lifecycle', () => {
  it('handles repeated and rapid endpoint updates on the active pointer', () => {
    const { result } = renderSelectionHook();

    act(() => result.current.startDrag({ row: 0, column: 0 }, 9));
    act(() => result.current.updateDrag({ row: 0, column: 1 }, 9));
    act(() => result.current.updateDrag({ row: 0, column: 2 }, 9));
    act(() => result.current.updateDrag({ row: 0, column: 2 }, 9));

    expect(result.current.dragSelection).toEqual([
      { row: 0, column: 0 },
      { row: 0, column: 1 },
      { row: 0, column: 2 },
    ]);

    act(() => result.current.endDrag({ row: 0, column: 2 }, 9));
    expect(result.current.phase).toBe('selected');
  });

  it('does not replace the active pointer after a second pointer starts', () => {
    const { result } = renderSelectionHook();

    act(() => result.current.startDrag({ row: 0, column: 0 }, 1));
    act(() => result.current.startDrag({ row: 2, column: 2 }, 2));

    act(() => result.current.updateDrag({ row: 1, column: 1 }, 2));
    expect(result.current.dragSelection).toEqual([
      { row: 0, column: 0 },
    ]);

    act(() => result.current.endDrag({ row: 0, column: 0 }, 1));
    expect(result.current.phase).toBe('selected');
  });

  it('ignores cancellation and end events from foreign pointers', () => {
    const { result } = renderSelectionHook();

    act(() => result.current.startDrag({ row: 0, column: 0 }, 1));
    act(() => result.current.updateDrag({ row: 0, column: 1 }, 2));
    act(() => result.current.endDrag({ row: 0, column: 1 }, 2));
    act(() => result.current.cancelDrag(2));

    expect(result.current.phase).toBe('selecting');
    expect(result.current.dragSelection).toEqual([
      { row: 0, column: 0 },
    ]);

    act(() => result.current.updateDrag({ row: 0, column: 2 }, 1));
    act(() => result.current.endDrag({ row: 0, column: 2 }, 1));

    expect(result.current.phase).toBe('selected');
  });

  it('cancels active selection only through the active pointer', () => {
    const { result } = renderSelectionHook();

    act(() => result.current.startDrag({ row: 1, column: 1 }, 7));

    act(() => {
      fireWindowPointer('pointercancel', 8);
    });
    expect(result.current.phase).toBe('selecting');

    act(() => {
      fireWindowPointer('pointercancel', 7);
    });
    expect(result.current.phase).toBe('cancelled');
    expect(result.current.dragSelection).toEqual([]);
  });

  it('ignores window pointer movement and up from another pointer', () => {
    const { result } = renderSelectionHook();

    act(() => result.current.startDrag({ row: 0, column: 0 }, 4));

    act(() => {
      fireWindowPointer('pointermove', 5);
      fireWindowPointer('pointerup', 5);
    });

    expect(result.current.phase).toBe('selecting');
    expect(result.current.dragSelection).toEqual([
      { row: 0, column: 0 },
    ]);

    act(() => {
      fireWindowPointer('pointerup', 4);
    });
    expect(result.current.phase).toBe('selected');
  });

  it('removes window listeners after the active pointer ends', () => {
    const removeListener = jest.spyOn(window, 'removeEventListener');
    const { result, unmount } = renderSelectionHook();

    act(() => result.current.startDrag({ row: 0, column: 0 }, 3));
    act(() => result.current.endDrag({ row: 0, column: 0 }, 3));

    expect(removeListener).toHaveBeenCalledWith(
      'pointermove',
      expect.any(Function)
    );
    expect(removeListener).toHaveBeenCalledWith(
      'pointerup',
      expect.any(Function)
    );
    expect(removeListener).toHaveBeenCalledWith(
      'pointercancel',
      expect.any(Function)
    );

    unmount();
    removeListener.mockRestore();
  });
});
