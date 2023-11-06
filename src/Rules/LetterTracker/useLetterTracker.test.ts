/**
 * @jest-environment jsdom
 */

import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { LetterWithPosition } from '../LetterWithPosition/LetterWithPosition';
import { useLetterTracker } from './useLetterTracker';

describe('useLetterTracker', (): void => {
  it('should track letters', (): void => {
    const { result } = renderHook(() => useLetterTracker());
    const tracker = result.current;

    const A: LetterWithPosition = {
      letter: 'A',
      row: 3,
      column: 5,
    };

    expect(tracker.isLetterComplete(A)).toBeFalsy();

    act(() => {
      tracker.completeLetters(A);
    });

    void waitFor(() => {
      expect(tracker.isLetterComplete(A)).toBeTruthy();
    });
  });
});
