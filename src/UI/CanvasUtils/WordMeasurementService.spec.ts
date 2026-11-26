import { WordMeasurementService } from './WordMeasurementService';

describe('WordMeasurementService', () => {
  describe('getLongestWordWidth', () => {
    it('returns zero when there are no words', () => {
      const measureText = jest.fn();
      const context: Pick<CanvasRenderingContext2D, 'measureText'> = {
        measureText,
      };
      const service = new WordMeasurementService();

      expect(service.getLongestWordWidth(context, [])).toBe(0);
      expect(measureText).not.toHaveBeenCalled();
    });
  });
});
