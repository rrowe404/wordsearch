/** @jest-environment jsdom */

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { TestUtils } from 'src/Rules/TestUtils/TestUtils';
import {
  WordSearchGenerationOptions,
  WordSearchOutputOption,
} from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { WordSearchOutput } from './WordSearchOutputComponent';
import { WordSearchOutputContext } from '../WordSearchOutputContext/WordSearchOutputContext';

jest.mock('./WordSearchOutputStyles.less', () => ({}));
jest.mock('../PlayableWordSearch/PlayableWordSearchComponent.less', () => ({}));

describe('WordSearchOutput', () => {
  const createOptions = (
    outputOption:
      | typeof WordSearchOutputOption.Image
      | typeof WordSearchOutputOption.Playable,
    wordList: string
  ): WordSearchGenerationOptions => {
    const options = TestUtils.createOptions([['A']]);
    options.wordList = wordList;

    if (outputOption === WordSearchOutputOption.Image) {
      return {
        ...options,
        outputOption: WordSearchOutputOption.Image,
        fontSize: 10,
      };
    }

    return { ...options, outputOption: WordSearchOutputOption.Playable };
  };

  const renderOutput = (options: WordSearchGenerationOptions) =>
    render(
      <WordSearchOutputContext.Provider
        value={{
          wordSearchGenerationOptions: options,
          setWordSearchGenerationOptions: jest.fn(),
        }}
      >
        <WordSearchOutput />
      </WordSearchOutputContext.Provider>
    );

  it.each([
    WordSearchOutputOption.Image,
    WordSearchOutputOption.Playable,
  ])('shows a message instead of a puzzle when no words fit (%s)', (mode) => {
    const { container } = renderOutput(createOptions(mode, 'TOOLONG'));

    expect(screen.getByRole('alert').textContent).toContain(
      'No words could be placed. Try using shorter words or increasing the grid size.'
    );
    expect(container.querySelector('img, .playable')).toBeNull();
  });

  it('still generates a playable puzzle when at least one word fits', () => {
    const { container } = renderOutput(
      createOptions(WordSearchOutputOption.Playable, 'A\nTOOLONG')
    );

    expect(screen.queryByRole('alert')).toBeNull();
    expect(container.querySelector('.playable')).not.toBeNull();
  });
});
