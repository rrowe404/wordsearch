/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { TestUtils } from 'src/Rules/TestUtils/TestUtils';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { PlayableWordSearchComponent } from './PlayableWordSearchComponent';

jest.mock('./PlayableWordSearchComponent.less', () => ({}));

const originalElementFromPointDescriptor = Object.getOwnPropertyDescriptor(
  document,
  'elementFromPoint'
);

interface PointerEventOptions {
  pointerId?: number;
  pointerType?: 'mouse' | 'touch' | 'pen';
  isPrimary?: boolean;
  clientX?: number;
  clientY?: number;
  relatedTarget?: EventTarget | null;
}

const firePointer = (
  target: EventTarget,
  type: string,
  options: PointerEventOptions = {}
) => {
  const event = new Event(type, { bubbles: true, cancelable: true });

  Object.defineProperties(event, {
    button: { value: 0 },
    clientX: { value: options.clientX ?? 0 },
    clientY: { value: options.clientY ?? 0 },
    isPrimary: { value: options.isPrimary ?? true },
    pointerId: { value: options.pointerId ?? 1 },
    pointerType: { value: options.pointerType ?? 'mouse' },
    relatedTarget: { value: options.relatedTarget ?? null },
  });

  act(() => {
    target.dispatchEvent(event);
  });
  return event;
};

describe('PlayableWordSearchComponent', () => {
  const createState = (
    matrix = [['w', 'a', 't']],
    wordList = 'wat'
  ) => {
    const state = new WordSearchState();
    const options = TestUtils.createOptions(matrix);
    options.wordList = wordList;
    options.showWordList = true;
    state.setOptions(options);
    state.seedMatrix(matrix);
    state.acceptedWordOverride([wordList]);

    return state;
  };

  beforeEach(() => {
    jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(300);
    jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(300);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    if (originalElementFromPointDescriptor) {
      Object.defineProperty(
        document,
        'elementFromPoint',
        originalElementFromPointDescriptor
      );
    } else {
      Reflect.deleteProperty(document, 'elementFromPoint');
    }
  });

  it('completes a word dragged from its first to its last letter', () => {
    const { container } = render(
      <PlayableWordSearchComponent wordSearchState={createState()} />
    );
    expect(container.querySelectorAll('.row')).toHaveLength(1);
    const cells = container.querySelectorAll('.cell');
    expect(cells).toHaveLength(3);
    expect(cells[0].getAttribute('data-row')).toBe('0');
    expect(cells[0].getAttribute('data-column')).toBe('0');
    expect(cells[2].getAttribute('data-row')).toBe('0');
    expect(cells[2].getAttribute('data-column')).toBe('2');
    const pointerDownEvent = firePointer(cells[0], 'pointerdown', {
      pointerType: 'touch',
    });
    expect(pointerDownEvent.defaultPrevented).toBe(true);
    expect(cells[0].classList.contains('pending')).toBe(true);

    firePointer(cells[1], 'pointerover', { pointerType: 'touch' });
    expect(cells[0].classList.contains('pending')).toBe(true);
    expect(cells[1].classList.contains('pending')).toBe(true);
    expect(cells[2].classList.contains('pending')).toBe(false);

    firePointer(cells[2], 'pointerover', { pointerType: 'touch' });
    expect(cells[0].classList.contains('pending')).toBe(true);
    expect(cells[1].classList.contains('pending')).toBe(true);
    expect(cells[2].classList.contains('pending')).toBe(true);

    firePointer(cells[2], 'pointerup', { pointerType: 'touch' });
    fireEvent.click(cells[2]);

    expect(
      container.querySelector('.wordListWord')?.classList.contains('completed')
    ).toBe(true);
    expect(cells[0].classList.contains('completed')).toBe(true);
    expect(cells[1].classList.contains('completed')).toBe(true);
    expect(cells[2].classList.contains('completed')).toBe(true);
  });

  it('completes a word using two clicks', () => {
    const { container } = render(
      <PlayableWordSearchComponent wordSearchState={createState()} />
    );
    const cells = container.querySelectorAll('.cell');
    const clickCell = (cell: Element) => {
      firePointer(cell, 'pointerdown');
      firePointer(cell, 'pointerup');
      fireEvent.click(cell);
    };

    clickCell(cells[0]);
    clickCell(cells[2]);

    expect(
      container.querySelector('.wordListWord')?.classList.contains('completed')
    ).toBe(true);
  });

  it('completes a vertical word and shows the winner indicator', () => {
    const matrix = [['w'], ['a'], ['t']];
    const { container } = render(
      <PlayableWordSearchComponent
        wordSearchState={createState(matrix, 'wat')}
      />
    );
    const cells = container.querySelectorAll('.cell');

    firePointer(cells[0], 'pointerdown');
    firePointer(cells[1], 'pointerover');
    firePointer(cells[2], 'pointerover');
    firePointer(cells[2], 'pointerup');

    expect(container.querySelector('.win')?.textContent).toBe('WINNER');
  });

  it('completes a diagonal word', () => {
    const matrix = [
      ['w', 'x', 'x'],
      ['x', 'a', 'x'],
      ['x', 'x', 't'],
    ];
    const { container } = render(
      <PlayableWordSearchComponent
        wordSearchState={createState(matrix, 'wat')}
      />
    );
    const cells = container.querySelectorAll('.cell');

    firePointer(cells[0], 'pointerdown');
    firePointer(cells[4], 'pointerover');
    firePointer(cells[8], 'pointerover');
    firePointer(cells[8], 'pointerup');

    expect(
      container.querySelector('.wordListWord')?.classList.contains('completed')
    ).toBe(true);
  });

  it.each(['mouse', 'touch', 'pen'] as const)(
    'starts a primary %s pointer drag',
    (pointerType) => {
      const { container } = render(
        <PlayableWordSearchComponent wordSearchState={createState()} />
      );
      const cells = container.querySelectorAll('.cell');

      const event = firePointer(cells[0], 'pointerdown', {
        pointerId: 11,
        pointerType,
        isPrimary: true,
      });

      expect(event.defaultPrevented).toBe(true);
      expect(cells[0].classList.contains('pending')).toBe(true);
    }
  );

  it('ignores a secondary pointer that tries to start a drag', () => {
    const { container } = render(
      <PlayableWordSearchComponent wordSearchState={createState()} />
    );
    const cells = container.querySelectorAll('.cell');

    firePointer(cells[0], 'pointerdown', {
      pointerId: 20,
      pointerType: 'touch',
      isPrimary: true,
    });
    const secondaryEvent = firePointer(cells[2], 'pointerdown', {
      pointerId: 21,
      pointerType: 'touch',
      isPrimary: false,
    });

    expect(secondaryEvent.defaultPrevented).toBe(false);
    expect(cells[0].classList.contains('pending')).toBe(true);
    expect(cells[1].classList.contains('pending')).toBe(false);
    expect(cells[2].classList.contains('pending')).toBe(false);
  });

  it('keeps a stationary pointer release from completing a word', () => {
    const { container } = render(
      <PlayableWordSearchComponent wordSearchState={createState()} />
    );
    const cells = container.querySelectorAll('.cell');

    firePointer(cells[1], 'pointerdown', { pointerId: 30 });
    firePointer(cells[1], 'pointerup', { pointerId: 30 });
    fireEvent.click(cells[1]);

    expect(
      container.querySelector('.wordListWord')?.classList.contains('completed')
    ).toBe(false);
  });

  it('cancels the drag when the pointer leaves the grid', () => {
    const { container } = render(
      <PlayableWordSearchComponent wordSearchState={createState()} />
    );
    const cells = container.querySelectorAll('.cell');
    const clickCell = (cell: Element) => {
      firePointer(cell, 'pointerdown');
      firePointer(cell, 'pointerup');
      fireEvent.click(cell);
    };

    firePointer(cells[0], 'pointerdown');
    firePointer(cells[1], 'pointerover');
    expect(cells[0].classList.contains('pending')).toBe(true);
    expect(cells[1].classList.contains('pending')).toBe(true);

    firePointer(container.querySelector('.game'), 'pointerout', {
      clientX: 100,
      clientY: 100,
      relatedTarget: document.body,
    });

    expect(cells[0].classList.contains('pending')).toBe(false);
    expect(cells[1].classList.contains('pending')).toBe(false);
    firePointer(cells[2], 'pointerover');
    expect(cells[2].classList.contains('pending')).toBe(false);

    clickCell(cells[2]);
    expect(cells[2].classList.contains('pending')).toBe(true);
    expect(cells[0].classList.contains('pending')).toBe(false);
  });

  it('allows the pointer into a grace area before cancelling the drag', () => {
    const { container } = render(
      <PlayableWordSearchComponent wordSearchState={createState()} />
    );
    const cells = container.querySelectorAll('.cell');
    const game = container.querySelector('.game');

    jest
      .spyOn(game, 'getBoundingClientRect')
      .mockReturnValue({
        bottom: 200,
        height: 100,
        left: 100,
        right: 400,
        top: 100,
        width: 300,
        x: 100,
        y: 100,
        toJSON: () => ({}),
      } as DOMRect);

    firePointer(cells[0], 'pointerdown');
    firePointer(cells[1], 'pointerover');
    firePointer(game, 'pointerout', {
      clientX: 405,
      clientY: 150,
      relatedTarget: document.body,
    });

    expect(cells[0].classList.contains('pending')).toBe(true);
    expect(cells[1].classList.contains('pending')).toBe(true);

    firePointer(window, 'pointermove', { clientX: 411, clientY: 150 });
    expect(cells[1].classList.contains('pending')).toBe(true);

    firePointer(window, 'pointermove', { clientX: 413, clientY: 150 });
    expect(cells[0].classList.contains('pending')).toBe(false);
    expect(cells[1].classList.contains('pending')).toBe(false);
  });

  it('returns to selection when the pointer re-enters the game from grace', () => {
    const { container } = render(
      <PlayableWordSearchComponent wordSearchState={createState()} />
    );
    const cells = container.querySelectorAll('.cell');
    const game = container.querySelector('.game');

    jest.spyOn(game, 'getBoundingClientRect').mockReturnValue({
      bottom: 200,
      height: 100,
      left: 100,
      right: 400,
      top: 100,
      width: 300,
      x: 100,
      y: 100,
      toJSON: () => ({}),
    } as DOMRect);
    Object.defineProperty(document, 'elementFromPoint', {
      configurable: true,
      value: jest.fn().mockReturnValue(cells[1]),
    });

    firePointer(cells[0], 'pointerdown');
    firePointer(cells[1], 'pointerover');
    firePointer(game, 'pointerout', {
      clientX: 405,
      clientY: 150,
      relatedTarget: document.body,
    });

    firePointer(game, 'pointermove', { clientX: 350, clientY: 150 });

    expect(cells[0].classList.contains('pending')).toBe(true);
    expect(cells[1].classList.contains('pending')).toBe(true);
  });

  it('cancels the active drag on pointercancel', () => {
    const { container } = render(
      <PlayableWordSearchComponent wordSearchState={createState()} />
    );
    const cells = container.querySelectorAll('.cell');

    firePointer(cells[0], 'pointerdown', { pointerId: 3 });
    firePointer(cells[1], 'pointerover', { pointerId: 3 });
    firePointer(window, 'pointercancel', { pointerId: 3 });

    expect(cells[0].classList.contains('pending')).toBe(false);
    expect(cells[1].classList.contains('pending')).toBe(false);
  });

  it('does not end or cancel a drag for a foreign pointer', () => {
    const { container } = render(
      <PlayableWordSearchComponent wordSearchState={createState()} />
    );
    const cells = container.querySelectorAll('.cell');

    firePointer(cells[0], 'pointerdown', { pointerId: 3 });
    firePointer(cells[1], 'pointerover', { pointerId: 3 });
    firePointer(window, 'pointerup', { pointerId: 4 });
    firePointer(window, 'pointercancel', { pointerId: 4 });

    expect(cells[0].classList.contains('pending')).toBe(true);
    expect(cells[1].classList.contains('pending')).toBe(true);

    firePointer(window, 'pointercancel', { pointerId: 3 });
    expect(cells[0].classList.contains('pending')).toBe(false);
    expect(cells[1].classList.contains('pending')).toBe(false);
  });

  it('completes a drag released within the grace area', () => {
    const { container } = render(
      <PlayableWordSearchComponent wordSearchState={createState()} />
    );
    const cells = container.querySelectorAll('.cell');
    const game = container.querySelector('.game');

    jest.spyOn(game, 'getBoundingClientRect').mockReturnValue({
      bottom: 200,
      height: 100,
      left: 100,
      right: 400,
      top: 100,
      width: 300,
      x: 100,
      y: 100,
      toJSON: () => ({}),
    } as DOMRect);

    firePointer(cells[0], 'pointerdown');
    firePointer(cells[1], 'pointerover');
    firePointer(cells[2], 'pointerover');
    firePointer(game, 'pointerout', {
      clientX: 405,
      clientY: 150,
      relatedTarget: document.body,
    });
    firePointer(window, 'pointerup', { clientX: 405, clientY: 150 });

    expect(
      container.querySelector('.wordListWord')?.classList.contains('completed')
    ).toBe(true);
    expect(cells[0].classList.contains('completed')).toBe(true);
    expect(cells[1].classList.contains('completed')).toBe(true);
    expect(cells[2].classList.contains('completed')).toBe(true);
  });

  it('tracks touch movement when pointer events remain captured by the first cell', () => {
    const { container } = render(
      <PlayableWordSearchComponent wordSearchState={createState()} />
    );
    const cells = container.querySelectorAll('.cell');
    const game = container.querySelector('.game');
    jest.spyOn(game, 'getBoundingClientRect').mockReturnValue({
      bottom: 200,
      height: 100,
      left: 100,
      right: 400,
      top: 100,
      width: 300,
      x: 100,
      y: 100,
      toJSON: () => ({}),
    } as DOMRect);
    Object.defineProperty(document, 'elementFromPoint', {
      configurable: true,
      value: jest.fn().mockReturnValue(cells[2]),
    });

    firePointer(cells[0], 'pointerdown', { pointerType: 'touch' });
    firePointer(cells[0], 'pointermove', {
      clientX: 250,
      clientY: 150,
      pointerType: 'touch',
    });

    expect(cells[0].classList.contains('pending')).toBe(true);
    expect(cells[1].classList.contains('pending')).toBe(true);
    expect(cells[2].classList.contains('pending')).toBe(true);

    firePointer(cells[0], 'pointerup', { pointerType: 'touch' });
    fireEvent.click(cells[0]);

    expect(
      container.querySelector('.wordListWord')?.classList.contains('completed')
    ).toBe(true);
  });
});
