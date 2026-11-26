/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Formik } from 'formik';
import { RangeInputComponent } from './RangeInputComponent';

describe('RangeInputComponent', () => {
  it('keeps the number input and slider synchronized', async () => {
    render(
      <Formik initialValues={{ width: 10 }} onSubmit={jest.fn()}>
        {({ handleChange, values }) => (
          <RangeInputComponent
            min={5}
            max={30}
            name='width'
            updated={handleChange}
            value={values.width}
          />
        )}
      </Formik>
    );

    const slider = screen.getByRole<HTMLInputElement>('slider');
    const numberInput = screen.getByRole<HTMLInputElement>('spinbutton');

    expect(slider.value).toBe('10');
    expect(numberInput.value).toBe('10');

    await act(async () => {
      fireEvent.change(numberInput, { target: { value: '22' } });
      await Promise.resolve();
    });
    expect(slider.value).toBe('22');
    expect(numberInput.value).toBe('22');

    await act(async () => {
      fireEvent.change(slider, { target: { value: '12' } });
      await Promise.resolve();
    });
    expect(slider.value).toBe('12');
    expect(numberInput.value).toBe('12');
  });

  it('does not update the slider while the textbox value is invalid', async () => {
    render(
      <Formik initialValues={{ width: 10 }} onSubmit={jest.fn()}>
        {({ handleChange, values }) => (
          <RangeInputComponent
            min={5}
            max={30}
            name='width'
            updated={handleChange}
            value={values.width}
          />
        )}
      </Formik>
    );

    const slider = screen.getByRole<HTMLInputElement>('slider');
    const numberInput = screen.getByRole<HTMLInputElement>('spinbutton');

    await act(async () => {
      fireEvent.change(numberInput, { target: { value: '' } });
      await Promise.resolve();
    });
    expect(numberInput.value).toBe('');
    expect(slider.value).toBe('10');

    await act(async () => {
      fireEvent.change(slider, { target: { value: '20' } });
      await Promise.resolve();
    });
    expect(slider.value).toBe('10');
    expect(numberInput.value).toBe('');

    await act(async () => {
      fireEvent.change(numberInput, { target: { value: '40' } });
      await Promise.resolve();
    });
    expect(slider.value).toBe('10');
    expect(numberInput.value).toBe('40');

    await act(async () => {
      fireEvent.blur(numberInput);
      await Promise.resolve();
    });
    expect(screen.getByText('Enter a value between 5 and 30.')).toBeTruthy();
    expect(slider.value).toBe('10');

    await act(async () => {
      fireEvent.change(numberInput, { target: { value: '22' } });
      await Promise.resolve();
    });
    expect(slider.value).toBe('22');
    expect(numberInput.value).toBe('22');
    expect(screen.queryByText('Enter a value between 5 and 30.')).toBeNull();
  });

  it('lets the slider recover from an invalid value after blur', async () => {
    render(
      <Formik initialValues={{ width: 10 }} onSubmit={jest.fn()}>
        {({ handleChange, values }) => (
          <RangeInputComponent
            min={5}
            max={30}
            name='width'
            updated={handleChange}
            value={values.width}
          />
        )}
      </Formik>
    );

    const slider = screen.getByRole<HTMLInputElement>('slider');
    const numberInput = screen.getByRole<HTMLInputElement>('spinbutton');

    await act(async () => {
      fireEvent.change(numberInput, { target: { value: '40' } });
      await Promise.resolve();
    });
    await act(async () => {
      fireEvent.blur(numberInput);
      await Promise.resolve();
    });
    expect(screen.getByText('Enter a value between 5 and 30.')).toBeTruthy();
    expect(slider.value).toBe('10');

    await act(async () => {
      fireEvent.change(slider, { target: { value: '20' } });
      await Promise.resolve();
    });

    expect(slider.value).toBe('20');
    expect(numberInput.value).toBe('20');
    expect(
      screen.queryByText('Enter a value between 5 and 30.')
    ).toBeNull();
  });
});
