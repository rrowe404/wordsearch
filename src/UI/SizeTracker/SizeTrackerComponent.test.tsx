/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { act, render } from '@testing-library/react';
import { SizeTrackerComponent } from './SizeTrackerComponent';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('SizeTrackerComponent', () => {
  it('passes current dimensions on initial sizing and resize', () => {
    const clientWidth = jest
      .spyOn(HTMLElement.prototype, 'clientWidth', 'get')
      .mockReturnValue(100);
    const clientHeight = jest
      .spyOn(HTMLElement.prototype, 'clientHeight', 'get')
      .mockReturnValue(200);
    const onResize = jest.fn();

    render(
      <SizeTrackerComponent className="tracker" onResize={onResize} />
    );

    expect(onResize).toHaveBeenNthCalledWith(1, { height: 200, width: 100 });
    const callsBeforeResize = onResize.mock.calls.length;
    clientWidth.mockReturnValue(150);
    clientHeight.mockReturnValue(250);

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(onResize).toHaveBeenNthCalledWith(callsBeforeResize + 1, {
      height: 250,
      width: 150,
    });
  });
});
