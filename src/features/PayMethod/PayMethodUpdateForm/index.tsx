import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import payMethodSchema from "@/schemas/PayMethod";
import Swal from "sweetalert2";
import { IPayMethodGet, IPayMethodPrincipal } from "@/interfaces/IPayMethod";
import { IUpdateFormProps } from "@/interfaces/IFormProps";
import { useSWRConfig } from "swr";
import { updateObject } from "@/services/HttpRequests";
import { Formik } from "formik";
import { theme } from "@/utils";
import { ThemeProvider } from "@mui/material/styles";
import { showSuccessToastMessage } from "@/lib/Messages";
import { AxiosError } from "axios";

const PayMethodUpdateForm = ({
  setFormikRef,
  values,
}: IUpdateFormProps<IPayMethodPrincipal, IPayMethodGet>) => {
  const { mutate } = useSWRConfig();

  return (
    <ThemeProvider theme={theme}>
      <Formik<IPayMethodPrincipal>
        initialValues={{
          ...values,
        }}
        innerRef={(ref) => setFormikRef(ref!)}
        validateOnChange={false}
        validationSchema={payMethodSchema}
        onSubmit={async (payMethodUpdate) => {
          try {
            await updateObject<IPayMethodGet, IPayMethodPrincipal>(
              `api/paymethod/${values.id}`,
              payMethodUpdate
            );
            mutate("api/paymethod");

            showSuccessToastMessage(
              "El método de pago se ha modificado correctamente"
            );
          } catch (err) {
            const error = err as AxiosError;
            Swal.showValidationMessage(error.response?.data as string);
          }
        }}
      >
        {({ values, errors, handleChange, isSubmitting, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1.5} marginY={2}>
              <Grid item xs={12}>
                <TextField
                  id="paymethod"
                  type="text"
                  label="Método de Pago"
                  error={Boolean(errors.paymethod)}
                  value={values.paymethod}
                  onChange={handleChange}
                  helperText={errors.paymethod}
                  disabled={isSubmitting}
                  fullWidth
                />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </ThemeProvider>
  );
};

export default PayMethodUpdateForm;
