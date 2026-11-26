import * as React from 'react';
import { Field } from 'formik';
import { CustomErrorMessage } from '../CustomErrorMessage/CustomErrorMessage';
import { InputProps } from './InputProps';

type RangeInputProps = Pick<
  InputProps<unknown>,
  'as' | 'autofocus' | 'min' | 'max' | 'name' | 'updated' | 'validate' | 'value'
>;

const RangeInputComponent: React.FC<RangeInputProps> = ({
  as = 'input',
  autofocus,
  min,
  max,
  name,
  updated,
  validate,
  value,
}) => {
  const hasAutofocused = React.useRef(false);
  const [rangeInputValue, setRangeInputValue] = React.useState(
    String(value ?? '')
  );
  const [rangeInputBlurred, setRangeInputBlurred] = React.useState(false);
  const [rangeValidationError, setRangeValidationError] = React.useState<
    string | undefined
  >();

  React.useEffect(() => {
    setRangeInputValue(String(value ?? ''));
  }, [value]);

  function doAutofocus(ref: HTMLInputElement) {
    if (ref && autofocus && !hasAutofocused.current) {
      ref.focus();
      hasAutofocused.current = true;
    }
  }

  function getRangeValidationError(inputValue: string) {
    if (inputValue.trim() === '') {
      return 'Required';
    }

    const numericValue = Number(inputValue);

    if (!Number.isFinite(numericValue)) {
      return 'Enter a valid number.';
    }

    if (!Number.isInteger(numericValue)) {
      return 'Enter a whole number.';
    }

    if (
      (min !== undefined && numericValue < min) ||
      (max !== undefined && numericValue > max)
    ) {
      return min !== undefined && max !== undefined
        ? `Enter a value between ${min} and ${max}.`
        : `Enter a value ${min !== undefined ? `greater than or equal to ${min}` : `less than or equal to ${max}`}.`;
    }

    return validate?.(inputValue) || undefined;
  }

  function isValidRangeValue(inputValue: string) {
    return !getRangeValidationError(inputValue);
  }

  function handleRangeChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isValidRangeValue(rangeInputValue) && !rangeInputBlurred) {
      return;
    }

    setRangeInputValue(e.currentTarget.value);
    setRangeValidationError(undefined);
    updated(e);
  }

  function handleRangeValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.currentTarget.value;
    setRangeInputValue(inputValue);
    const error = getRangeValidationError(inputValue);

    if (!error) {
      setRangeValidationError(undefined);
      updated(e);
    } else if (rangeInputBlurred) {
      setRangeValidationError(error);
    }
  }

  function handleRangeValueBlur() {
    setRangeInputBlurred(true);
    setRangeValidationError(getRangeValidationError(rangeInputValue));
  }

  return (
    <>
      <Field
        as={as}
        innerRef={(ref: HTMLInputElement) => doAutofocus(ref)}
        onChange={handleRangeChange}
        type='range'
        min={min}
        max={max}
        name={name}
        tabIndex='0'
        value={value}
        validate={(val: string) => validate && validate(val)}
      />
      <input
        className='input-range-value'
        type='number'
        min={min}
        max={max}
        name={name}
        onChange={handleRangeValueChange}
        onBlur={handleRangeValueBlur}
        value={rangeInputValue}
      />
      <CustomErrorMessage
        name={name}
        errors={
          rangeValidationError
            ? { [name]: rangeValidationError }
            : undefined
        }
      />
    </>
  );
};

export { RangeInputComponent };
