import ButtonAdd from "@/components/ButtonAdd";
import FormDialogPost from "@/components/FormDialogPost";
import ComboBox from "@/components/ComboBox";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ImageDropzone from "@/components/ImageDropzone";
import Fastfood from "@mui/icons-material/Fastfood";
import { useTheme } from "@mui/material/styles";
import { useOpenClose } from "@/hooks";
import { useFormik } from "formik";
import { useSWRConfig } from "swr";
import { useContext, useState } from "react";
import { AlertContext } from "@/contexts/AlertSuccess";
import { createObject } from "@/services/HttpRequests";
import { ICategoryDishGet, IDishCreateOrUpdate, IDishGet } from "@/interfaces";
import { dishSchema } from "@/schemas";
import { uploadToCloudinary } from "@/utils";

const initialValues: IDishCreateOrUpdate = {
  nameDish: "",
  priceDish: 0.0,
  imgDish: "",
};

const DishAddForm = () => {
  const theme = useTheme();
  const { mutate } = useSWRConfig();
  const { handleOpen } = useContext(AlertContext);
  const [open, openDialog, closeDialog] = useOpenClose(false);
  const [file, setFile] = useState<File | null>(null);

  const formik = useFormik<IDishCreateOrUpdate>({
    initialValues,
    validationSchema: dishSchema,
    onSubmit: async (newDish) => {
      if (file) {
        const urlImage = await uploadToCloudinary(file);
        newDish.imgDish = urlImage;
      }
      await createObject<IDishGet, IDishCreateOrUpdate>("api/dish", newDish);
      mutate("api/dish");
      closeDialog();
      handleOpen("La Plato se ha registrado correctamente");
      formik.resetForm();
    },
    validateOnChange: false,
  });

  return (
    <>
      <ButtonAdd text="Añadir Plato" openDialog={openDialog} />

      <FormDialogPost
        Icon={Fastfood}
        open={open}
        title="Añadir Plato"
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
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <ImageDropzone
                isSubmitting={formik.isSubmitting}
                onDrop={(file) => {
                  setFile(file);
                  formik.setFieldValue("imgDish", file.name);
                }}
              />
              {formik.errors.imgDish && (
                <Typography
                  sx={{
                    color: `${theme.palette.error.main}`,
                  }}
                  variant="caption"
                >
                  {formik.errors.imgDish}
                </Typography>
              )}
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
                handleChange={(category: ICategoryDishGet | null) => {
                  formik.setFieldValue("categoryDishId", category?.id);
                }}
                disabled={formik.isSubmitting}
                textFieldProps={{
                  label: "Categoría",
                  error: Boolean(formik.errors.categoryDishId),
                  helperText: formik.errors.categoryDishId,
                }}
              />
            </Grid>
          </Grid>
        </form>
      </FormDialogPost>
    </>
  );
};

export default DishAddForm;
