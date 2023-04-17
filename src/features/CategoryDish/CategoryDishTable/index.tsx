import { Edit, Delete } from "@mui/icons-material";
import {
  GridColDef,
  GridActionsCellItem,
  GridRowParams,
  useGridApiRef,
} from "@mui/x-data-grid";
import { FormDialogDelete, DataTable } from "@/components";
import { useOpenClose } from "@/hooks";
import { useContext, useState } from "react";
import { AlertContext } from "@/contexts/AlertSuccess";
import { deleteObject, fetchAll } from "@/services/HttpRequests";
import { ICategoryDishGet } from "@/interfaces/ICategoryDish";
import { handleLastPageDeletion } from "@/utils";
import { CategoryDishUpdateForm } from "@/features";
import useSWR, { useSWRConfig } from "swr";

const CategoryDishTable = () => {
  const { data, isLoading } = useSWR("api/categorydish", () =>
    fetchAll<ICategoryDishGet>("api/categorydish")
  );
  const { mutate } = useSWRConfig();
  const { handleOpen } = useContext(AlertContext);
  const [selectedCategoryDish, setSelectedCategoryDish] =
    useState<ICategoryDishGet | null>(null);
  const [openDialogD, openDialogDelete, closeDialogDelete] =
    useOpenClose(false);
  const [openDialogU, openDialogUpdate, closeDialogUpdate] =
    useOpenClose(false);
  const gridApiRef = useGridApiRef();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "nameCatDish", headerName: "Categoría", width: 200 },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 100,
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
            onClick={() => {
              setSelectedCategoryDish(categoryDish.row);
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
        title={`¿Estás seguro de eliminar la categoria "${selectedCategoryDish?.nameCatDish}"?`}
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
    </>
  );
};

export default CategoryDishTable;
