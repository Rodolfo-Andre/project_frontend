import ListErrors from "@/components/ListErrors";
import signInSchema from "@/schemas/SignIn";
import AxiosServices from "@/services/Axios";
import ISignIn from "@/interfaces/ISignIn";
import ISignInResponse from "@/interfaces/ISignInResponse";
import IError400 from "@/interfaces/IError400";
import IResponseMessage from "@/interfaces/IResponseMessage";
import { FormikProps, useFormik } from "formik";
import { useContext, useState, ReactNode } from "react";
import { AxiosError } from "axios";
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
          console.log(login);
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
