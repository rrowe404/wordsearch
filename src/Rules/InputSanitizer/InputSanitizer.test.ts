import { InputSanitizer } from './InputSanitizer';

const sanitizer = new InputSanitizer();

describe('InputSanitizer', (): void => {
  describe('sanitize', (): void => {
    it('should strip spaces', (): void => {
      expect(sanitizer.sanitize('hello world')).toBe('helloworld');
    });

    it('should strip special characters', (): void => {
      expect(sanitizer.sanitize('hello-world')).toBe('helloworld');
      expect(sanitizer.sanitize('<hello></world>')).toBe('helloworld');
    });
  });
});
