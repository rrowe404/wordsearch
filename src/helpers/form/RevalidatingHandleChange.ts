import { FormikProps } from 'formik';

/** a couple of the fields like Columns and Rows can affect the validity of other fields if they are changed */
let revalidatingHandleChange = (
  e: React.ChangeEvent,
  props: FormikProps<any>
) => {
  props.handleChange(e);
  props.validateForm();
};

export { revalidatingHandleChange };
