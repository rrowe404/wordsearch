/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { act, renderHook } from '@testing-library/react';
import { SizeTrackerResize } from '../SizeTracker/SizeTrackerResize';
import {
  MAX_LETTER_SIZE,
  MIN_LETTER_SIZE,
  usePlayableWordSearchSize,
} from './usePlayableWordSearchSize';

describe('usePlayableWordSearchSize', () => {
  const renderSizeHook = (columns = 3) => {
    const titleRef: React.MutableRefObject<HTMLDivElement | null> = {
      current: null,
    };
    const wordListRef: React.MutableRefObject<HTMLDivElement | null> = {
      current: null,
    };
    titleRef.current = { clientHeight: 0 } as HTMLDivElement;
    wordListRef.current = { clientHeight: 0 } as HTMLDivElement;

    const hook = renderHook(() =>
      usePlayableWordSearchSize({ columns, titleRef, wordListRef })
    );

    return { ...hook, titleRef, wordListRef };
  };

  it('uses width as the limiting dimension', () => {
    const { result } = renderSizeHook();

    act(() => result.current.onResize({ width: 200, height: 300 }));

    expect(result.current.letterSize).toBe(50);
    expect(result.current.tableWidth).toBe(150);
  });

  it('subtracts title and word-list heights when height is limiting', () => {
    const { result, titleRef, wordListRef } = renderSizeHook();
    titleRef.current = { clientHeight: 30 } as HTMLDivElement;
    wordListRef.current = { clientHeight: 20 } as HTMLDivElement;

    act(() => result.current.onResize({ width: 400, height: 200 }));

    expect(result.current.letterSize).toBe(50);
    expect(result.current.tableWidth).toBe(150);
  });

  it('does not subtract title and word-list heights when width is limiting', () => {
    const { result, titleRef, wordListRef } = renderSizeHook();
    titleRef.current = { clientHeight: 300 } as HTMLDivElement;
    wordListRef.current = { clientHeight: 200 } as HTMLDivElement;

    act(() => result.current.onResize({ width: 200, height: 1000 }));

    expect(result.current.letterSize).toBe(50);
    expect(result.current.tableWidth).toBe(150);
  });

  it('applies the minimum letter size when title and word-list consume the height', () => {
    const { result, titleRef, wordListRef } = renderSizeHook();
    titleRef.current = { clientHeight: 80 } as HTMLDivElement;
    wordListRef.current = { clientHeight: 70 } as HTMLDivElement;

    act(() => result.current.onResize({ width: 400, height: 120 }));

    expect(result.current.letterSize).toBe(MIN_LETTER_SIZE);
  });

  it('normalizes sizes and recalculates width at the maximum', () => {
    const { result } = renderSizeHook(5);

    act(() => result.current.onResize({ width: 400, height: 400 }));

    expect(result.current.letterSize).toBe(MAX_LETTER_SIZE);
    expect(result.current.tableWidth).toBe(MAX_LETTER_SIZE * 5);

    act(() => result.current.onResize({ width: 20, height: 20 }));

    expect(result.current.letterSize).toBe(MIN_LETTER_SIZE);
  });

  it('does not replace the measured state when neither value changes', () => {
    const { result } = renderSizeHook();
    const resize: SizeTrackerResize = { width: 400, height: 400 };

    act(() => result.current.onResize(resize));
    const firstMeasuredState = result.current;
    act(() => result.current.onResize(resize));

    expect(result.current.letterSize).toBe(firstMeasuredState.letterSize);
    expect(result.current.tableWidth).toBe(firstMeasuredState.tableWidth);
  });
});
