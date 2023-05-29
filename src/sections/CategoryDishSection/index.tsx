import Typography from "@mui/material/Typography";
import ContentBox from "@/components/ContentBox";
import CategoryDishAddForm from "@/features/CategoryDish/CategoryDishAddForm";
import CategoryDishTable from "@/features/CategoryDish/CategoryDishTable";
import ButtonAdd from "@/components/ButtonAdd";
import Box from "@mui/material/Box";
import FoodBank from "@mui/icons-material/FoodBank";
import useSWR from "swr";
import {
  ICategoryDishGet,
  ICategoryDishPrincipal,
} from "@/interfaces/ICategoryDish";
import { FormikProps } from "formik/dist/types";
import { showForm } from "@/lib/Forms";
import { fetchAll } from "@/services/HttpRequests";
import LoaderComponent from "@/components/LoaderComponent";

const CategoryDishSection = () => {
  let formikRef: FormikProps<ICategoryDishPrincipal>;
  const { data, isLoading } = useSWR("api/categorydish", () =>
    fetchAll<ICategoryDishGet>("api/categorydish")
  );

  if (isLoading) return <LoaderComponent />;

  return (
    <ContentBox>
      <Box sx={{ marginTop: 2, marginLeft: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Categorías de Platos
        </Typography>

        <ButtonAdd
          text="Añadir Categoria de Plato"
          openDialog={() => {
            showForm({
              title: "Añadir Categoria de Plato",
              cancelButtonText: "CANCELAR",
              confirmButtonText: "AÑADIR",
              customClass: {
                confirmButton: "custom-confirm custom-confirm-create",
              },
              icon: (
                <FoodBank
                  sx={{
                    display: "block",
                    margin: "auto",
                    fontSize: "5rem",
                    color: "#0D6EFD",
                  }}
                  color="primary"
                />
              ),
              contentHtml: (
                <CategoryDishAddForm
                  setFormikRef={(ref) => (formikRef = ref)}
                />
              ),
              preConfirm: async () => {
                await formikRef.submitForm();
                if (formikRef && !formikRef.isValid) {
                  return false;
                }
              },
            });
          }}
        />
      </Box>

      <CategoryDishTable data={data!} />
    </ContentBox>
  );
};

export default CategoryDishSection;
