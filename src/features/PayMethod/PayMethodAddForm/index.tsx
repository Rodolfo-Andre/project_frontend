import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import payMethodSchema from "@/schemas/PayMethod";
import { useSWRConfig } from "swr";
import { createObject } from "@/services/HttpRequests";
import { IPayMethodGet, IPayMethodPrincipal } from "@/interfaces/IPayMethod";
import { IFormProps } from "@/interfaces/IFormProps";
import { Formik } from "formik";
import { theme } from "@/utils";
import { ThemeProvider } from "@mui/material/styles";
import { showSuccessToastMessage } from "@/lib/Messages";

const initialValues: IPayMethodPrincipal = {
  paymethod: "",
};

const PayMethodAddForm = ({
  setFormikRef,
}: IFormProps<IPayMethodPrincipal>) => {
  const { mutate } = useSWRConfig();

  return (
    <ThemeProvider theme={theme}>
      <Formik<IPayMethodPrincipal>
        initialValues={initialValues}
        innerRef={(ref) => setFormikRef(ref!)}
        validateOnChange={false}
        validationSchema={payMethodSchema}
        onSubmit={async (newPayMethod) => {
          await createObject<IPayMethodGet, IPayMethodPrincipal>(
            "api/paymethod",
            newPayMethod
          );
          mutate("api/paymethod");

          showSuccessToastMessage(
            "El método de pago se ha registrado correctamente"
          );
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

export default PayMethodAddForm;
