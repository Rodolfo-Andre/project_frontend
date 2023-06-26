import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import categoryDishSchema from "@/schemas/CategoryDish";
import Swal from "sweetalert2";
import {
  ICategoryDishGet,
  ICategoryDishPrincipal,
} from "@/interfaces/ICategoryDish";
import { IUpdateFormProps } from "@/interfaces/IFormProps";
import { useSWRConfig } from "swr";
import { updateObject } from "@/services/HttpRequests";
import { Formik } from "formik";
import { theme } from "@/utils";
import { ThemeProvider } from "@mui/material/styles";
import { showSuccessToastMessage } from "@/lib/Messages";
import { AxiosError } from "axios";

const CategoryDishUpdateForm = ({
  setFormikRef,
  values,
}: IUpdateFormProps<ICategoryDishPrincipal, ICategoryDishGet>) => {
  const { mutate } = useSWRConfig();

  return (
    <ThemeProvider theme={theme}>
      <Formik<ICategoryDishPrincipal>
        initialValues={{
          ...values,
        }}
        innerRef={(ref) => setFormikRef(ref!)}
        validateOnChange={false}
        validationSchema={categoryDishSchema}
        onSubmit={async (categoryDishUpdate) => {
          try {
            await updateObject<ICategoryDishGet, ICategoryDishPrincipal>(
              `api/categorydish/${values.id}`,
              categoryDishUpdate
            );
            mutate("api/categorydish");

            showSuccessToastMessage(
              "La categoría se ha modificado correctamente"
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
                  id="nameCatDish"
                  type="text"
                  label="Categoría"
                  error={Boolean(errors.nameCatDish)}
                  value={values.nameCatDish}
                  onChange={handleChange}
                  helperText={errors.nameCatDish}
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

export default CategoryDishUpdateForm;
