import Typography from "@mui/material/Typography";
import ContentBox from "@/components/ContentBox";
import DishTable from "@/features/Dish/DishTable";
import ButtonAdd from "@/components/ButtonAdd";
import DishAddForm from "@/features/Dish/DishAddForm";
import Box from "@mui/material/Box";
import Fastfood from "@mui/icons-material/Fastfood";
import useSWR from "swr";
import LoaderComponent from "@/components/LoaderComponent";
import { IDishCreateOrUpdate, IDishGet } from "@/interfaces/IDish";
import { FormikProps } from "formik/dist/types";
import { showForm } from "@/lib/Forms";
import { fetchAll } from "@/services/HttpRequests";
import { ICategoryDishGet } from "@/interfaces/ICategoryDish";

const DishSection = () => {
  let formikRef: FormikProps<IDishCreateOrUpdate>;
  const { data: dishes, isLoading: isLoadingDishes } = useSWR("api/dish", () =>
    fetchAll<IDishGet>("api/dish")
  );

  const { data: categoriesDishes, isLoading: isLoadingCategoriesDishes } =
    useSWR("api/categorydish", () =>
      fetchAll<ICategoryDishGet>("api/categorydish")
    );

  if (isLoadingDishes || isLoadingCategoriesDishes) return <LoaderComponent />;

  return (
    <ContentBox>
      <Box sx={{ marginTop: 2, marginX: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Platos
        </Typography>

        <ButtonAdd
          text="Añadir Plato"
          openDialog={() => {
            showForm({
              title: "Añadir Plato",
              cancelButtonText: "CANCELAR",
              confirmButtonText: "AÑADIR",
              customClass: {
                confirmButton: "custom-confirm custom-confirm-create",
              },
              icon: (
                <Fastfood
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
                <DishAddForm
                  data={categoriesDishes!}
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

      <DishTable data={dishes!} categoriesDishes={categoriesDishes!} />
    </ContentBox>
  );
};

export default DishSection;
