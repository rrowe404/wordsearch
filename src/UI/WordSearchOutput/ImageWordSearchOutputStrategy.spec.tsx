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
    expect(canvas.height).toBe(60);
  });

  it('centers the word list under the puzzle and sizes the image to its rows', () => {
    const canvas = document.createElement('canvas');
    const wordListXPositions: number[] = [];
    const context = {
      fillRect: jest.fn(),
      fillText: jest.fn((text: string, x: number) => {
        if (text.length > 1) {
          wordListXPositions.push(x);
        }
      }),
      measureText: jest.fn((text: string) => ({ width: text.length * 10 })),
    } as unknown as CanvasRenderingContext2D;
    jest.spyOn(canvas, 'getContext').mockReturnValue(context);
    jest.spyOn(canvas, 'toDataURL').mockReturnValue('data:image/png;base64,');
    jest.spyOn(document, 'createElement').mockReturnValue(canvas);

    const options = {
      ...TestUtils.createOptions([['A', 'B', 'C', 'D']]),
      showWordList: true,
      fontSize: 10,
    };
    const state = new WordSearchState();
    state.setOptions(options);
    state.seedMatrix([['A', 'B', 'C', 'D']]);
    state.acceptedWordOverride(['AA', 'BB', 'CC', 'DD', 'EE']);

    new ImageWordSearchOutputStrategy().output(state);

    expect(canvas.width).toBe(100);
    expect(canvas.height).toBe(85);
    expect(wordListXPositions).toEqual([20, 60, 20, 60, 20]);
  });

  it('keeps long words and the puzzle centered when the word list is wider', () => {
    const canvas = document.createElement('canvas');
    const puzzleXPositions: number[] = [];
    const wordListXPositions: number[] = [];
    const context = {
      fillRect: jest.fn(),
      fillText: jest.fn((text: string, x: number) => {
        if (text.length === 1) {
          puzzleXPositions.push(x);
        } else if (text.length > 1) {
          wordListXPositions.push(x);
        }
      }),
      measureText: jest.fn((text: string) => ({ width: text.length * 10 })),
    } as unknown as CanvasRenderingContext2D;
    jest.spyOn(canvas, 'getContext').mockReturnValue(context);
    jest.spyOn(canvas, 'toDataURL').mockReturnValue('data:image/png;base64,');
    jest.spyOn(document, 'createElement').mockReturnValue(canvas);

    const options = {
      ...TestUtils.createOptions([['A', 'B', 'C', 'D']]),
      showWordList: true,
      fontSize: 10,
    };
    const state = new WordSearchState();
    state.setOptions(options);
    state.seedMatrix([['A', 'B', 'C', 'D']]);
    state.acceptedWordOverride(['ABCDEFGHIJKL']);

    new ImageWordSearchOutputStrategy().output(state);

    expect(canvas.width).toBe(140);
    expect(puzzleXPositions).toEqual([40, 60, 80, 100]);
    expect(wordListXPositions).toEqual([10]);
  });

  it('gives the title matching top and bottom margins', () => {
    const canvas = document.createElement('canvas');
    const textDraws: Array<{ text: string; y: number }> = [];
    const context = {
      fillRect: jest.fn(),
      fillText: jest.fn((text: string, _x: number, y: number) => {
        textDraws.push({ text, y });
      }),
      measureText: jest.fn().mockReturnValue({ width: 0 }),
    } as unknown as CanvasRenderingContext2D;
    jest.spyOn(canvas, 'getContext').mockReturnValue(context);
    jest.spyOn(canvas, 'toDataURL').mockReturnValue('data:image/png;base64,');
    jest.spyOn(document, 'createElement').mockReturnValue(canvas);

    const options = {
      ...TestUtils.createOptions([['A']]),
      title: 'Puzzle title',
      fontSize: 10,
    };
    const state = new WordSearchState();
    state.setOptions(options);
    state.seedMatrix([['A']]);

    new ImageWordSearchOutputStrategy().output(state);

    expect(textDraws).toEqual([
      { text: 'Puzzle title', y: 5 },
      { text: 'A', y: 35 },
    ]);
    expect(canvas.height).toBe(40);
  });
});
