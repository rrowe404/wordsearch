/** @jest-environment jsdom */

import { TestUtils } from '../../Rules/TestUtils/TestUtils';
import { WordSearchState } from '../../Rules/WordSearchState/WordSearchState';
import { WordSearchOutputOption } from '../../Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { ImageWordSearchOutputStrategy } from './ImageWordSearchOutputStrategy';

describe('ImageWordSearchOutputStrategy', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('uses the configured font size and scales the image spacing', () => {
    const canvas = document.createElement('canvas');
    const context = {
      fillRect: jest.fn(),
      fillText: jest.fn(),
      measureText: jest.fn().mockReturnValue({ width: 0 }),
    } as unknown as CanvasRenderingContext2D;
    let width = canvas.width;
    Object.defineProperty(canvas, 'width', {
      configurable: true,
      get: () => width,
      set: (value: number) => {
        width = value;
        context.font = '10px sans-serif';
      },
    });
    let height = canvas.height;
    Object.defineProperty(canvas, 'height', {
      configurable: true,
      get: () => height,
      set: (value: number) => {
        height = value;
        context.font = '10px sans-serif';
      },
    });
    jest.spyOn(canvas, 'getContext').mockReturnValue(context);
    jest.spyOn(canvas, 'toDataURL').mockReturnValue('data:image/png;base64,');
    jest.spyOn(document, 'createElement').mockReturnValue(canvas);

    const options = {
      ...TestUtils.createOptions([['A']]),
      outputOption: WordSearchOutputOption.Image,
      fontSize: 20,
    };
    const state = new WordSearchState();
    state.setOptions(options);
    state.seedMatrix([['A']]);

    new ImageWordSearchOutputStrategy().output(state);

    expect(context.font).toBe('20px sans-serif');
    expect(canvas.width).toBe(80);
    expect(canvas.height).toBe(40);
  });
});
