import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ComboBox from "@/components/ComboBox";
import ImageDropzone from "@/components/ImageDropzone";
import dishSchema from "@/schemas/Dish";
import { IDishGet, IDishCreateOrUpdate } from "@/interfaces/IDish";
import { ICategoryDishGet } from "@/interfaces/ICategoryDish";
import { IUpdateFormProps } from "@/interfaces/IFormProps";
import { useSWRConfig } from "swr";
import { useState } from "react";
import { updateObject } from "@/services/HttpRequests";
import { uploadToCloudinary, theme, onlyDecimal } from "@/utils";
import { Formik } from "formik";
import { ThemeProvider } from "@mui/material/styles";
import { showSuccessToastMessage } from "@/lib/Messages";

interface IDishUpdateFormProps
  extends IUpdateFormProps<IDishCreateOrUpdate, IDishGet> {
  data: ICategoryDishGet[];
}

const DishUpdateForm = ({
  setFormikRef,
  values: dish,
  data,
}: IDishUpdateFormProps) => {
  const { mutate } = useSWRConfig();
  const [file, setFile] = useState<File | null>(null);

  return (
    <ThemeProvider theme={theme}>
      <Formik<IDishCreateOrUpdate>
        initialValues={{
          imgDish: dish.imgDish,
          nameDish: dish.nameDish,
          priceDish: dish.priceDish,
          categoryDishId: dish.categoryDish.id,
        }}
        innerRef={(ref) => setFormikRef(ref!)}
        validateOnChange={false}
        validationSchema={dishSchema}
        onSubmit={async (dishUpdate) => {
          if (file) {
            const imageUrl = await uploadToCloudinary(file);
            dishUpdate.imgDish = imageUrl;
          }
          await updateObject<IDishGet, IDishCreateOrUpdate>(
            `api/dish/${dish.id}`,
            dishUpdate
          );
          mutate("api/dish");

          showSuccessToastMessage("El plato se ha modificado correctamente");
        }}
      >
        {({
          values,
          errors,
          handleChange,
          setFieldValue,
          isSubmitting,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1.5} marginY={2}>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <ImageDropzone
                  imageDish={values.imgDish}
                  isSubmitting={isSubmitting}
                  onDrop={(file) => {
                    setFile(file);
                    setFieldValue("imgDish", file.name);
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="nameDish"
                  type="text"
                  label="Plato"
                  error={Boolean(errors.nameDish)}
                  value={values.nameDish}
                  onChange={handleChange}
                  helperText={errors.nameDish}
                  disabled={isSubmitting}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="priceDish"
                  type="number"
                  label="Precio"
                  error={Boolean(errors.priceDish)}
                  value={values.priceDish}
                  onChange={handleChange}
                  onKeyDown={onlyDecimal}
                  helperText={errors.priceDish}
                  disabled={isSubmitting}
                  InputProps={{ componentsProps: { input: { min: 0 } } }}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <ComboBox
                  id="id"
                  label="nameCatDish"
                  value={dish.categoryDish}
                  values={data}
                  handleChange={(category: ICategoryDishGet | null) => {
                    setFieldValue("categoryDishId", category?.id);
                  }}
                  disabled={isSubmitting}
                  textFieldProps={{
                    label: "Categoría",
                    error: Boolean(errors.categoryDishId),
                    helperText: errors.categoryDishId,
                    disabled: isSubmitting,
                  }}
                />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </ThemeProvider>
  );
};

export default DishUpdateForm;
