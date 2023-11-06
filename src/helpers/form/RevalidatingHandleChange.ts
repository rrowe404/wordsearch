import { FormikProps } from 'formik';
import * as React from 'react';

/** a couple of the fields like Columns and Rows can affect the validity of other fields if they are changed */
function revalidatingHandleChange<T>(
  e: React.ChangeEvent,
  props: FormikProps<T>
): void {
  props.handleChange(e);
  void props.validateForm();
}

export { revalidatingHandleChange };
