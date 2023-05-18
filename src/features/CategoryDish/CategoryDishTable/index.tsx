import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import FormDialogDelete from "@/components/FormDialogDelete";
import DataTable from "@/components/DataTable";
import {
  useGridApiRef,
  GridActionsCellItem,
  GridRowParams,
  GridColDef,
} from "@mui/x-data-grid";
import { useOpenClose } from "@/hooks";
import { useContext, useState } from "react";
import { AlertContext } from "@/contexts/AlertSuccess";
import { deleteObject, fetchAll, getObject } from "@/services/HttpRequests";
import { ICategoryDishGet } from "@/interfaces";
import { handleLastPageDeletion } from "@/utils";
import { CategoryDishUpdateForm } from "@/features";
import useSWR, { useSWRConfig } from "swr";
import { DialogError } from "@/components";

const CategoryDishTable = () => {
  const { data, isLoading } = useSWR("api/categorydish", () =>
    fetchAll<ICategoryDishGet>("api/categorydish")
  );
  const { mutate } = useSWRConfig();
  const { handleOpen } = useContext(AlertContext);
  const [messageError, setMessageError] = useState<string>("");
  const [selectedCategoryDish, setSelectedCategoryDish] =
    useState<ICategoryDishGet | null>(null);
  const [openDialogD, openDialogDelete, closeDialogDelete] =
    useOpenClose(false);
  const [openDialogU, openDialogUpdate, closeDialogUpdate] =
    useOpenClose(false);
  const [openDialogE, openDialogError, closeDialogError] = useOpenClose(false);
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
              setSelectedCategoryDish(categoryDish.row);
              openDialogUpdate();
            }}
          />,
          <GridActionsCellItem
            key={categoryDish.row.id}
            icon={<Delete />}
            label="Delete"
            color="error"
            onClick={async () => {
              setSelectedCategoryDish(categoryDish.row);
              const count = await getObject<number>(
                `api/CategoryDish/${categoryDish.id}/number-dish`
              );

              if (count > 0) {
                setMessageError(
                  `No es posible eliminar la categoría debido a que se encontró ${count} plato${
                    count !== 1 ? "s" : ""
                  } asignado a dicha categoría.`
                );
                openDialogError();
                return;
              }

              openDialogDelete();
            }}
          />,
        ];
      },
    },
  ];

  return (
    <>
      <DataTable
        apiRef={gridApiRef}
        columns={columns}
        loading={isLoading}
        rows={data}
      />

      <FormDialogDelete
        title={`¿Estás seguro de eliminar la categoría "${selectedCategoryDish?.nameCatDish}"?`}
        open={openDialogD}
        handleCancel={() => {
          closeDialogDelete();
        }}
        handleSuccess={async () => {
          await deleteObject(`api/categorydish/${selectedCategoryDish?.id}`);
          handleLastPageDeletion(gridApiRef, data!.length);
          mutate("api/categorydish");
          closeDialogDelete();
          handleOpen("La categoría se ha eliminado correctamente");
          setSelectedCategoryDish(null);
        }}
      />

      {openDialogU && (
        <CategoryDishUpdateForm
          setSelectedCategoryDish={setSelectedCategoryDish}
          open={openDialogU}
          closeDialog={() => {
            closeDialogUpdate();
          }}
          categoryDish={selectedCategoryDish!}
        />
      )}

      <DialogError
        title={`NO SE PUEDE ELIMINAR LA CATEGORÍA - ${selectedCategoryDish?.id}`}
        description={messageError}
        open={openDialogE}
        closeDialog={() => {
          closeDialogError();
        }}
      />
    </>
  );
};

export default CategoryDishTable;
