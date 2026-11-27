/**
 * @jest-environment jsdom
 */

import { act, renderHook } from '@testing-library/react';
import { TestUtils } from 'src/Rules/TestUtils/TestUtils';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { useWordCompletion } from './useWordCompletion';

describe('useWordCompletion', () => {
  it('completes a matching word and clears both pending letters', () => {
    const matrix = [['w', 'a', 't']];
    const wordSearchState = new WordSearchState();
    const options = TestUtils.createOptions(matrix);
    options.wordList = 'Wat';
    wordSearchState.setOptions(options);
    wordSearchState.seedMatrix(matrix);
    wordSearchState.acceptedWordOverride(['Wat']);

    const { result } = renderHook(() => useWordCompletion(wordSearchState));
    const { startLetterTracker, endLetterTracker } = result.current;

    act(() => {
      startLetterTracker.setPending({ row: 0, column: 0 });
      endLetterTracker.setPending({ row: 0, column: 2 });
    });

    expect(result.current.winner).toBe(true);
    expect(result.current.wordTracker.isWordComplete('Wat')).toBe(true);
    expect(result.current.letterTracker.isLetterComplete({ row: 0, column: 0 })).toBe(
      true
    );
    expect(result.current.letterTracker.isLetterComplete({ row: 0, column: 1 })).toBe(
      true
    );
    expect(result.current.letterTracker.isLetterComplete({ row: 0, column: 2 })).toBe(
      true
    );
    expect(result.current.startLetterTracker.hasPending()).toBe(false);
    expect(result.current.endLetterTracker.hasPending()).toBe(false);
  });
});
