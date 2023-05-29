import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import FoodBank from "@mui/icons-material/FoodBank";
import DataTable from "@/components/DataTable";
import DeleteForever from "@mui/icons-material/DeleteForever";
import Typography from "@mui/material/Typography";
import {
  useGridApiRef,
  GridActionsCellItem,
  GridRowParams,
  GridColDef,
} from "@mui/x-data-grid";
import { deleteObject, getObject } from "@/services/HttpRequests";
import {
  ICategoryDishGet,
  ICategoryDishPrincipal,
} from "@/interfaces/ICategoryDish";
import { handleLastPageDeletion } from "@/utils";
import { CategoryDishUpdateForm } from "@/features/CategoryDish";
import { showForm } from "@/lib/Forms";
import { showErrorMessage, showSuccessToastMessage } from "@/lib/Messages";
import { FormikProps } from "formik/dist/types";
import { useSWRConfig } from "swr";

interface ICategoryDishTableProps {
  data: ICategoryDishGet[];
}

const CategoryDishTable = ({ data }: ICategoryDishTableProps) => {
  let formikRef: FormikProps<ICategoryDishPrincipal>;

  const { mutate } = useSWRConfig();

  const gridApiRef = useGridApiRef();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", minWidth: 100, flex: 1 },
    { field: "nameCatDish", headerName: "Categoría", minWidth: 200, flex: 11 },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      minWidth: 100,
      flex: 1,
      getActions: (categoryDish: GridRowParams<ICategoryDishGet>) => {
        return [
          <GridActionsCellItem
            key={categoryDish.row.id}
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            color="warning"
            onClick={() => {
              showForm({
                title: "Actualizar Plato",
                cancelButtonText: "CANCELAR",
                confirmButtonText: "ACTUALIZAR",
                customClass: {
                  confirmButton: "custom-confirm custom-confirm-update",
                },
                icon: (
                  <FoodBank
                    sx={{
                      display: "block",
                      margin: "auto",
                      fontSize: "5rem",
                      color: "#ED6C02",
                    }}
                    color="primary"
                  />
                ),
                contentHtml: (
                  <CategoryDishUpdateForm
                    setFormikRef={(ref) => (formikRef = ref)}
                    values={categoryDish.row}
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
          />,
          <GridActionsCellItem
            key={categoryDish.row.id}
            icon={<Delete />}
            label="Delete"
            color="error"
            onClick={async () => {
              const count = await getObject<number>(
                `api/CategoryDish/${categoryDish.id}/number-dish`
              );

              if (count > 0) {
                showErrorMessage({
                  title: `NO SE PUEDE ELIMINAR LA CATEGORÍA - ${categoryDish.id}`,
                  contentHtml: `No es posible eliminar la categoría debido a que se encontró ${count} plato${
                    count !== 1 ? "s" : ""
                  } asignado a dicha categoría.`,
                });

                return;
              }

              showForm({
                title: "Eliminar Categoría de Plato",
                cancelButtonText: "CANCELAR",
                confirmButtonText: "ELIMINAR",
                customClass: {
                  confirmButton: "custom-confirm custom-confirm-create",
                },
                icon: (
                  <DeleteForever
                    sx={{
                      display: "block",
                      margin: "auto",
                      fontSize: "5rem",
                    }}
                    color="error"
                  />
                ),
                contentHtml: (
                  <Typography>
                    ¿Estás seguro de eliminar la categoría{" "}
                    {`"${categoryDish.row.nameCatDish}"`}?
                  </Typography>
                ),
                preConfirm: async () => {
                  await deleteObject(`api/categorydish/${categoryDish.row.id}`);
                  handleLastPageDeletion(gridApiRef, data.length);
                  mutate("api/categorydish");

                  showSuccessToastMessage(
                    "La categoría se ha eliminado correctamente"
                  );
                },
              });
            }}
          />,
        ];
      },
    },
  ];

  return (
    <>
      <DataTable apiRef={gridApiRef} columns={columns} rows={data} />
    </>
  );
};

export default CategoryDishTable;
