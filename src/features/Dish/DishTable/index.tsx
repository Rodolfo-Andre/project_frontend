import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import DataTable from "@/components/DataTable";
import DishUpdateForm from "@/features/Dish/DishUpdateForm";
import InsertPhotoOutlined from "@mui/icons-material/InsertPhotoOutlined";
import Fastfood from "@mui/icons-material/Fastfood";
import Image from "next/image";
import ContentCenter from "@/components/ContentCenter";
import DeleteForever from "@mui/icons-material/DeleteForever";
import Typography from "@mui/material/Typography";
import {
  useGridApiRef,
  GridActionsCellItem,
  GridValueGetterParams,
  GridRowParams,
  GridColDef,
  GridCellParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { deleteObject, getObject } from "@/services/HttpRequests";
import { IDishGet, IDishCreateOrUpdate } from "@/interfaces/IDish";
import { handleLastPageDeletion } from "@/utils";
import { showForm } from "@/lib/Forms";
import { showErrorMessage, showSuccessToastMessage } from "@/lib/Messages";
import { FormikProps } from "formik/dist/types";
import { useSWRConfig } from "swr";
import { ICategoryDishGet } from "@/interfaces/ICategoryDish";

interface IDishTableProps {
  data: IDishGet[];
  categoriesDishes: ICategoryDishGet[];
}

const DishTable = ({ data, categoriesDishes }: IDishTableProps) => {
  let formikRef: FormikProps<IDishCreateOrUpdate>;

  const { mutate } = useSWRConfig();

  const gridApiRef = useGridApiRef();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", minWidth: 100, flex: 1 },
    {
      field: "imageDish",
      headerName: "Imagen",
      minWidth: 150,
      sortable: false,
      filterable: false,
      flex: 3,
      renderCell: (params: GridCellParams<IDishGet>) => (
        <ContentCenter
          sxProps={{
            width: "100px",
            height: "100px",
            backgroundColor: "rgb(248, 249, 250)",
          }}
        >
          {params.row.imgDish ? (
            <Image
              src={params.row.imgDish}
              alt="Image"
              width={800}
              height={600}
              priority={true}
              style={{
                width: "100%",
                objectFit: "contain",
                height: "100%",
              }}
            />
          ) : (
            <InsertPhotoOutlined fontSize="large" />
          )}
        </ContentCenter>
      ),
    },
    { field: "nameDish", headerName: "Plato", minWidth: 200, flex: 3 },
    {
      field: "priceDish",
      headerName: "Precio",
      type: "number",
      headerAlign: "left",
      align: "left",
      minWidth: 200,
      flex: 2,
      valueFormatter: (params: GridValueFormatterParams) => {
        return `S/. ${(params.value as number).toFixed(2)}`;
      },
    },
    {
      field: "category",
      headerName: "Categoría",
      type: "singleSelect",
      minWidth: 150,
      flex: 3,
      valueGetter: (params: GridValueGetterParams<IDishGet>) =>
        params.row.categoryDish.id,
      valueOptions: categoriesDishes.map((categoryDish) => ({
        value: categoryDish.id,
        label: categoryDish.nameCatDish,
      })),
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      minWidth: 100,
      flex: 1,
      getActions: (dish: GridRowParams<IDishGet>) => {
        return [
          <GridActionsCellItem
            key={dish.row.id}
            icon={<Edit />}
            label="Edit"
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
                  <Fastfood
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
                  <DishUpdateForm
                    data={categoriesDishes}
                    setFormikRef={(ref) => (formikRef = ref)}
                    values={dish.row}
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
            key={dish.row.id}
            icon={<Delete />}
            label="Delete"
            color="error"
            onClick={async () => {
              const count = await getObject<number>(
                `api/Dish/${dish.id}/number-details-commands`
              );

              if (count > 0) {
                showErrorMessage({
                  title: `NO SE PUEDE ELIMINAR EL PLATO - ${dish.id}`,
                  contentHtml: `No es posible eliminar el plato debido a que se encontró ${count} comanda${
                    count !== 1 ? "s" : ""
                  } asignado a dicho plato.`,
                });

                return;
              }

              showForm({
                title: "Eliminar Plato",
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
                    ¿Estás seguro de eliminar el plato{" "}
                    {`"${dish.row.nameDish}"`}?
                  </Typography>
                ),
                preConfirm: async () => {
                  await deleteObject(`api/dish/${dish.row.id}`);
                  handleLastPageDeletion(gridApiRef, data.length);
                  mutate("api/dish");

                  showSuccessToastMessage(
                    "El plato se ha eliminado correctamente"
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
      <DataTable
        rowHeight={130}
        columns={columns}
        rows={data}
        apiRef={gridApiRef}
      />
    </>
  );
};

export default DishTable;
