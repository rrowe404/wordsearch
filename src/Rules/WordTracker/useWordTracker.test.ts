/**
 * @jest-environment jsdom
 */

import { renderHook, waitFor } from '@testing-library/react';
import { useWordTracker } from './useWordTracker';
import { WordTracker } from './WordTracker';

describe('useWordTracker', (): void => {
  it('should track words', (): void => {
    const { result } = renderHook(() => useWordTracker(['hi', 'bye']));
    const tracker = result.current;

    expect(tracker.isComplete()).toBeFalsy();
    expect(tracker.isWordComplete('hi')).toBeFalsy();
    expect(tracker.isWordComplete('bye')).toBeFalsy();

    tracker.completeWord('hi');

    waitFor(() => {
      expect(tracker.isWordComplete('hi')).toBeTruthy();
    });

    tracker.completeWord('bye');

    waitFor(() => {
      expect(tracker.isWordComplete('bye')).toBeTruthy();
      expect(tracker.isComplete()).toBeTruthy();
    });
  });
});
