import { IDishGet, IDishCreateOrUpdate } from "@/interfaces/IDish";
import { dishSchema } from "@/schemas/Dish";
import { Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Fastfood } from "@mui/icons-material";
import { useSWRConfig } from "swr";
import { SetStateAction, useContext, useState } from "react";
import { AlertContext } from "@/contexts/AlertSuccess";
import { ComboBox, FormDialogUpdate, ImageDropzone } from "@/components";
import { updateObject } from "@/services/HttpRequests";
import { ICategoryDishGet } from "@/interfaces/ICategoryDish";
import { uploadToCloudinary } from "@/utils";

interface IDishFormUpdateProps {
  dish: IDishGet;
  open: boolean;
  closeDialog: () => void;
  setSelectedDish: (value: SetStateAction<IDishGet | null>) => void;
}

const DishUpdateForm = ({
  dish,
  open,
  closeDialog,
  setSelectedDish,
}: IDishFormUpdateProps) => {
  const { mutate } = useSWRConfig();
  const { handleOpen } = useContext(AlertContext);
  const [file, setFile] = useState<File | null>(null);

  const formik = useFormik<IDishCreateOrUpdate>({
    initialValues: {
      imgDish: dish.imgDish,
      nameDish: dish.nameDish,
      priceDish: dish.priceDish,
      categoryDishId: dish.categoryDish.id,
    },
    validationSchema: dishSchema,
    onSubmit: async (dishUpdate) => {
      if (file) {
        const imageUrl = await uploadToCloudinary(file);
        dishUpdate.imgDish = imageUrl;
      }
      await updateObject<IDishGet, IDishCreateOrUpdate>(
        `api/dish/${dish.id}`,
        dishUpdate
      );
      mutate("api/dish");
      closeDialog();
      handleOpen("El plato se ha modificado correctamente");
      formik.resetForm();
      setSelectedDish(null);
    },
    validateOnChange: false,
  });

  return (
    <>
      <FormDialogUpdate
        Icon={Fastfood}
        open={open}
        title="Actualizar Plato"
        isSubmitting={formik.isSubmitting}
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
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <ImageDropzone
                imageDish={dish.imgDish}
                isSubmitting={formik.isSubmitting}
                onDrop={(file) => {
                  setFile(file);
                  formik.setFieldValue("imgDish", file.name);
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="nameDish"
                type="text"
                label="Plato"
                error={Boolean(formik.errors.nameDish)}
                value={formik.values.nameDish}
                onChange={formik.handleChange}
                helperText={formik.errors.nameDish}
                disabled={formik.isSubmitting}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="priceDish"
                type="text"
                label="Precio"
                error={Boolean(formik.errors.priceDish)}
                value={formik.values.priceDish}
                onChange={formik.handleChange}
                helperText={formik.errors.priceDish}
                disabled={formik.isSubmitting}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <ComboBox
                id="id"
                label="nameCatDish"
                url="api/categorydish"
                value={formik.values.categoryDishId}
                handleChange={(category: ICategoryDishGet | null) => {
                  formik.setFieldValue("categoryDishId", category?.id);
                }}
                textFieldProps={{
                  label: "Categoría",
                  error: Boolean(formik.errors.categoryDishId),
                  helperText: formik.errors.categoryDishId,
                  disabled: formik.isSubmitting,
                }}
              />
            </Grid>
          </Grid>
        </form>
      </FormDialogUpdate>
    </>
  );
};

export default DishUpdateForm;
