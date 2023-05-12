import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FoodBank from "@mui/icons-material/FoodBank";
import FormDialogUpdate from "@/components/FormDialogUpdate";
import { ICategoryDishGet, ICategoryDishPrincipal } from "@/interfaces";
import { categoryDishSchema } from "@/schemas";
import { useFormik } from "formik";
import { useSWRConfig } from "swr";
import { SetStateAction, useContext } from "react";
import { AlertContext } from "@/contexts/AlertSuccess";
import { updateObject } from "@/services/HttpRequests";

interface ICategoryDishFormUpdateProps {
  categoryDish: ICategoryDishGet;
  open: boolean;
  closeDialog: () => void;
  setSelectedCategoryDish: (
    value: SetStateAction<ICategoryDishGet | null>
  ) => void;
}

const CategoryDishUpdateForm = ({
  categoryDish,
  open,
  closeDialog,
  setSelectedCategoryDish,
}: ICategoryDishFormUpdateProps) => {
  const { mutate } = useSWRConfig();
  const { handleOpen } = useContext(AlertContext);

  const formik = useFormik<ICategoryDishPrincipal>({
    initialValues: {
      ...categoryDish,
    },
    validationSchema: categoryDishSchema,
    onSubmit: async (categoryDishUpdate) => {
      await updateObject<ICategoryDishGet, ICategoryDishPrincipal>(
        `api/categorydish/${categoryDish.id}`,
        categoryDishUpdate
      );
      mutate("api/categorydish");
      closeDialog();
      handleOpen("La categoría se ha modificado correctamente");
      formik.resetForm();
      setSelectedCategoryDish(null);
    },
    validateOnChange: false,
  });

  return (
    <>
      <FormDialogUpdate
        Icon={FoodBank}
        open={open}
        title="Actualizar Categoría"
        handleCancel={() => {
          closeDialog();
          formik.resetForm();
        }}
        isSubmitting={formik.isSubmitting}
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
      </FormDialogUpdate>
    </>
  );
};

export default CategoryDishUpdateForm;
