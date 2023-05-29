import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { ITableGet, ITableUpdate } from "@/interfaces/ITable";
import { IUpdateFormProps } from "@/interfaces/IFormProps";
import { useSWRConfig } from "swr";
import { updateObject } from "@/services/HttpRequests";
import TypeTableState from "@/enum/TypeTableState";
import { tableUpdateSchema } from "@/schemas";
import { Formik } from "formik";
import { theme } from "@/utils";
import { ThemeProvider } from "@mui/material/styles";
import { showSuccessToastMessage } from "@/lib/Messages";

const TableUpdateForm = ({
  setFormikRef,
  values,
}: IUpdateFormProps<ITableUpdate, ITableGet>) => {
  const { mutate } = useSWRConfig();

  return (
    <ThemeProvider theme={theme}>
      <Formik<ITableUpdate>
        initialValues={{
          numSeats: values.numSeats,
          stateTable: Object.values(TypeTableState).find(
            (v) => v === values.stateTable
          )!,
        }}
        innerRef={(ref) => setFormikRef(ref!)}
        validateOnChange={false}
        validationSchema={tableUpdateSchema}
        onSubmit={async (tableUpdate) => {
          await updateObject<ITableGet, ITableUpdate>(
            `api/table/${values.numTable}`,
            tableUpdate
          );
          mutate("api/table");

          showSuccessToastMessage("La mesa se ha modificado correctamente");
        }}
      >
        {({ values, errors, handleChange, isSubmitting, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1.5} marginY={2}>
              <Grid item xs={12}>
                <TextField
                  id="numSeats"
                  type="number"
                  label="Cantidad de Asientos"
                  error={Boolean(errors.numSeats)}
                  value={values.numSeats}
                  onChange={handleChange}
                  helperText={errors.numSeats}
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

export default TableUpdateForm;
