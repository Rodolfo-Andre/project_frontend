import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import categoryDishSchema from "@/schemas/CategoryDish";
import { useSWRConfig } from "swr";
import { createObject } from "@/services/HttpRequests";
import {
  ICategoryDishGet,
  ICategoryDishPrincipal,
} from "@/interfaces/ICategoryDish";
import { IFormProps } from "@/interfaces/IFormProps";
import { Formik } from "formik";
import { theme } from "@/utils";
import { ThemeProvider } from "@mui/material/styles";
import { showSuccessToastMessage } from "@/lib/Messages";

const initialValues: ICategoryDishPrincipal = {
  nameCatDish: "",
};

const CategoryDishAddForm = ({
  setFormikRef,
}: IFormProps<ICategoryDishPrincipal>) => {
  const { mutate } = useSWRConfig();

  return (
    <ThemeProvider theme={theme}>
      <Formik<ICategoryDishPrincipal>
        initialValues={initialValues}
        innerRef={(ref) => setFormikRef(ref!)}
        validateOnChange={false}
        validationSchema={categoryDishSchema}
        onSubmit={async (newCategoryDish) => {
          await createObject<ICategoryDishGet, ICategoryDishPrincipal>(
            "api/categorydish",
            newCategoryDish
          );
          mutate("api/categorydish");

          showSuccessToastMessage(
            "La categoría se ha registrado correctamente"
          );
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

export default CategoryDishAddForm;
