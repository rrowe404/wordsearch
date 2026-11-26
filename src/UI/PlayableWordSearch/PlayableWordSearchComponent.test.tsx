/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { TestUtils } from 'src/Rules/TestUtils/TestUtils';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { PlayableWordSearchComponent } from './PlayableWordSearchComponent';

jest.mock('./PlayableWordSearchComponent.less', () => ({}));

describe('PlayableWordSearchComponent', () => {
  const createState = () => {
    const matrix = [['w', 'a', 't']];
    const state = new WordSearchState();
    const options = TestUtils.createOptions(matrix);
    options.wordList = 'wat';
    options.showWordList = true;
    state.setOptions(options);
    state.seedMatrix(matrix);
    state.acceptedWordOverride(['wat']);

    return state;
  };

  beforeEach(() => {
    jest.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(300);
    jest.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(300);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('completes a word dragged from its first to its last letter', () => {
    const { container } = render(
      <PlayableWordSearchComponent wordSearchState={createState()} />
    );
    const cells = container.querySelectorAll('.cell');
    const mouseDownEvent = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
      button: 0,
    });

    act(() => {
      cells[0].dispatchEvent(mouseDownEvent);
    });
    expect(mouseDownEvent.defaultPrevented).toBe(true);
    expect(cells[0].classList.contains('pending')).toBe(true);

    fireEvent.mouseEnter(cells[1]);
    expect(cells[0].classList.contains('pending')).toBe(true);
    expect(cells[1].classList.contains('pending')).toBe(true);
    expect(cells[2].classList.contains('pending')).toBe(false);

    fireEvent.mouseEnter(cells[2]);
    expect(cells[0].classList.contains('pending')).toBe(true);
    expect(cells[1].classList.contains('pending')).toBe(true);
    expect(cells[2].classList.contains('pending')).toBe(true);

    fireEvent.mouseUp(cells[2], { button: 0 });
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
      fireEvent.mouseDown(cell, { button: 0 });
      fireEvent.mouseUp(cell, { button: 0 });
      fireEvent.click(cell);
    };

    clickCell(cells[0]);
    clickCell(cells[2]);

    expect(
      container.querySelector('.wordListWord')?.classList.contains('completed')
    ).toBe(true);
  });

  it('cancels the drag when the pointer leaves the grid', () => {
    const { container } = render(
      <PlayableWordSearchComponent wordSearchState={createState()} />
    );
    const cells = container.querySelectorAll('.cell');
    const clickCell = (cell: Element) => {
      fireEvent.mouseDown(cell, { button: 0 });
      fireEvent.mouseUp(cell, { button: 0 });
      fireEvent.click(cell);
    };

    fireEvent.mouseDown(cells[0], { button: 0 });
    fireEvent.mouseEnter(cells[1]);
    expect(cells[0].classList.contains('pending')).toBe(true);
    expect(cells[1].classList.contains('pending')).toBe(true);

    fireEvent.mouseLeave(container.querySelector('.game'), {
      clientX: 100,
      clientY: 100,
    });

    expect(cells[0].classList.contains('pending')).toBe(false);
    expect(cells[1].classList.contains('pending')).toBe(false);
    fireEvent.mouseEnter(cells[2]);
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

    fireEvent.mouseDown(cells[0], { button: 0 });
    fireEvent.mouseEnter(cells[1]);
    fireEvent.mouseLeave(game, { clientX: 405, clientY: 150 });

    expect(cells[0].classList.contains('pending')).toBe(true);
    expect(cells[1].classList.contains('pending')).toBe(true);

    fireEvent.mouseMove(window, { clientX: 411, clientY: 150 });
    expect(cells[1].classList.contains('pending')).toBe(true);

    fireEvent.mouseMove(window, { clientX: 413, clientY: 150 });
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

    fireEvent.mouseDown(cells[0], { button: 0 });
    fireEvent.mouseEnter(cells[1]);
    fireEvent.mouseEnter(cells[2]);
    fireEvent.mouseLeave(game, { clientX: 405, clientY: 150 });
    fireEvent.mouseUp(window, { button: 0, clientX: 405, clientY: 150 });

    expect(
      container.querySelector('.wordListWord')?.classList.contains('completed')
    ).toBe(true);
    expect(cells[0].classList.contains('completed')).toBe(true);
    expect(cells[1].classList.contains('completed')).toBe(true);
    expect(cells[2].classList.contains('completed')).toBe(true);
  });
});
