import { ButtonAdd, FormDialogPost } from "@/components";
import { useOpenClose } from "@/hooks";
import { Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { FoodBank } from "@mui/icons-material";
import { useSWRConfig } from "swr";
import { useContext } from "react";
import { AlertContext } from "@/contexts/AlertSuccess";
import { createObject } from "@/services/HttpRequests";
import { categoryDishSchema } from "@/schemas/CategoryDish";
import {
  ICategoryDishGet,
  ICategoryDishPrincipal,
} from "@/interfaces/ICategoryDish";

const initialValues: ICategoryDishPrincipal = {
  nameCatDish: "",
};

const CategoryDishAddForm = () => {
  const { mutate } = useSWRConfig();
  const { handleOpen } = useContext(AlertContext);
  const [open, openDialog, closeDialog] = useOpenClose(false);

  const formik = useFormik<ICategoryDishPrincipal>({
    initialValues,
    validationSchema: categoryDishSchema,
    onSubmit: async (newCategoryDish) => {
      await createObject<ICategoryDishGet, ICategoryDishPrincipal>(
        "api/categorydish",
        newCategoryDish
      );
      mutate("api/categorydish");
      closeDialog();
      handleOpen("La categoría se ha registrado correctamente");
      formik.resetForm();
    },
    validateOnChange: false,
  });

  return (
    <>
      <ButtonAdd text="Añadir Categoría" openDialog={openDialog} />

      <FormDialogPost
        Icon={FoodBank}
        open={open}
        title="Añadir Categoría"
        handleCancel={() => {
          closeDialog();
          formik.resetForm();
        }}
        handleSuccess={() => {
          formik.handleSubmit();
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1.5} marginY={2}>
            <Grid item xs={12}>
              <TextField
                id="nameCatDish"
                type="text"
                label="Categoría"
                error={Boolean(formik.errors.nameCatDish)}
                value={formik.values.nameCatDish}
                onChange={formik.handleChange}
                helperText={formik.errors.nameCatDish}
                disabled={formik.isSubmitting}
                fullWidth
              />
            </Grid>
          </Grid>
        </form>
      </FormDialogPost>
    </>
  );
};

export default CategoryDishAddForm;
