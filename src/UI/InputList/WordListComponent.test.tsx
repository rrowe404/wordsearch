/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Formik } from 'formik';
import { WordListComponent } from './WordListComponent';

jest.mock('../Input/ReactInput.less', () => ({}));
jest.mock('./WordList.less', () => ({}));

describe('WordListComponent', () => {
  it('displays and updates the word list from Formik values', async () => {
    const { container } = render(
      <Formik initialValues={{ wordList: 'Frikandel' }} onSubmit={jest.fn()}>
        {({ handleChange, values }) => (
          <>
            <WordListComponent
              handleChange={handleChange}
              value={values.wordList}
            />
            <output>{values.wordList}</output>
          </>
        )}
      </Formik>
    );

    const wordList = screen.getByRole<HTMLTextAreaElement>('textbox');
    expect(wordList.value).toBe('Frikandel');

    await act(async () => {
      fireEvent.change(wordList, {
        target: { value: 'Frikandel\nStroopwafel' },
      });
      await Promise.resolve();
    });

    expect(wordList.value).toBe('Frikandel\nStroopwafel');
    expect(container.querySelector('output')?.textContent).toBe(
      'Frikandel\nStroopwafel'
    );
  });
});
