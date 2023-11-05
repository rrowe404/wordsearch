import { LetterWithPosition } from '../LetterWithPosition/LetterWithPosition';
import { LetterTracker } from './LetterTracker';

describe('LetterTracker', (): void => {
  it('should be created', (): void => {
    const letterTracker = new LetterTracker();
    expect(letterTracker).toBeTruthy();
  });

  it('should track letters', (): void => {
    const tracker = new LetterTracker();

    const A: LetterWithPosition = {
      letter: 'A',
      row: 3,
      column: 5,
    };

    expect(tracker.isLetterComplete(A)).toBeFalsy();

    tracker.completeLetters(A);

    expect(tracker.isLetterComplete(A)).toBeTruthy();
  });
});
