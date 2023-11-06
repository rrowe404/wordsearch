/**
 * @jest-environment jsdom
 */

import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useWordTracker } from './useWordTracker';

describe('useWordTracker', (): void => {
  it('should track words', (): void => {
    const { result } = renderHook(() => useWordTracker(['hi', 'bye']));
    const tracker = result.current;

    expect(tracker.isComplete()).toBeFalsy();
    expect(tracker.isWordComplete('hi')).toBeFalsy();
    expect(tracker.isWordComplete('bye')).toBeFalsy();

    act(() => {
      tracker.completeWord('hi');
    });

    void waitFor(() => {
      expect(tracker.isWordComplete('hi')).toBeTruthy();
    });

    act(() => {
      tracker.completeWord('bye');
    });

    void waitFor(() => {
      expect(tracker.isWordComplete('bye')).toBeTruthy();
      expect(tracker.isComplete()).toBeTruthy();
    });
  });
});
