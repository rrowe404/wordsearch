import { WordTracker } from './WordTracker';

describe('WordTracker', (): void => {
  it('should be created', (): void => {
    const tracker = new WordTracker(['hi']);
    expect(tracker).toBeTruthy();
  });

  it('should track words', (): void => {
    const tracker = new WordTracker(['hi', 'bye']);
    expect(tracker.isComplete()).toBeFalsy();
    expect(tracker.isWordComplete('hi')).toBeFalsy();
    expect(tracker.isWordComplete('bye')).toBeFalsy();

    tracker.completeWord('hi');
    expect(tracker.isWordComplete('hi')).toBeTruthy();

    tracker.completeWord('bye');
    expect(tracker.isWordComplete('bye')).toBeTruthy();

    expect(tracker.isComplete()).toBeTruthy();
  });
});
