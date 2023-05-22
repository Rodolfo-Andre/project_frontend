import { FormikProps } from "formik/dist/types";

interface IFormProps<T> {
  setFormikRef: (ref: FormikProps<T>) => void;
}

interface IUpdateFormProps<T, O> extends IFormProps<T> {
  values: O;
}

export type { IFormProps, IUpdateFormProps };
