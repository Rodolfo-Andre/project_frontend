import { FormikProps, useFormik } from "formik";
import { useContext, useState, ReactNode } from "react";
import { signInSchema } from "@/schemas";
import { ISignIn, ISignInResponse, IError400 } from "@/interfaces";
import { AxiosServices } from "@/services";
import { AxiosError } from "axios";
import { ListErrors } from "@/components";
import { AuthContext } from "@/contexts/Auth";

const useSignIn = (
  initialValues: ISignIn
): [FormikProps<ISignIn>, ReactNode] => {
  const { login } = useContext(AuthContext);
  const formik = useFormik<ISignIn>({
    initialValues,
    validationSchema: signInSchema,
    onSubmit: async (data, { setErrors }) => {
      try {
        const { data: result, status } = await AxiosServices.post(
          "api/auth/login",
          data
        );

        if (status === 200) {
          setError(null);
          const { accessToken } = result as ISignInResponse;
          login(accessToken);
        }
      } catch (error) {
        const { response } = error as AxiosError;

        if (response?.status === 400) {
          const { errors } = response?.data as IError400;

          const errorsObject = Object.keys(errors).reduce<{
            [key: string]: string;
          }>((acc, key) => {
            acc[key.toLowerCase()] = " ";
            return acc;
          }, {});

          setError(<ListErrors errorMessages={errors} />);
          setErrors(errorsObject);
        }

        if (response?.status === 401) {
          const { message } = response?.data as IResponseMessage;

          setError(message);
          setErrors({
            email: " ",
            password: " ",
          });
        }
      }
    },
    validateOnChange: false,
  });
  const [error, setError] = useState<ReactNode>();

  return [formik, error];
};

export default useSignIn;
