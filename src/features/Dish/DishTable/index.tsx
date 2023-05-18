import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import FormDialogDelete from "@/components/FormDialogDelete";
import DataTable from "@/components/DataTable";
import DishUpdateForm from "@/features/Dish/DishUpdateForm";
import Image from "next/image";
import useSWR, { useSWRConfig } from "swr";
import {
  useGridApiRef,
  GridActionsCellItem,
  GridValueGetterParams,
  GridRowParams,
  GridColDef,
  GridCellParams,
} from "@mui/x-data-grid";
import { useOpenClose } from "@/hooks";
import { useContext, useState } from "react";
import { AlertContext } from "@/contexts/AlertSuccess";
import { deleteObject, fetchAll } from "@/services/HttpRequests";
import { IDishGet } from "@/interfaces";
import { handleLastPageDeletion } from "@/utils";
import { Box } from "@mui/material";

const DishTable = () => {
  const { data, isLoading } = useSWR("api/dish", () =>
    fetchAll<IDishGet>("api/dish")
  );
  const { mutate } = useSWRConfig();
  const { handleOpen } = useContext(AlertContext);
  const [selectedDish, setSelectedDish] = useState<IDishGet | null>(null);
  const [openDialogD, openDialogDelete, closeDialogDelete] =
    useOpenClose(false);
  const [openDialogU, openDialogUpdate, closeDialogUpdate] =
    useOpenClose(false);
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100px",
            height: "100px",
            backgroundColor: "rgb(248, 249, 250)",
          }}
        >
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
        </Box>
      ),
    },
    { field: "nameDish", headerName: "Plato", minWidth: 200, flex: 3 },
    { field: "priceDish", headerName: "Precio", minWidth: 200, flex: 2 },
    {
      field: "category",
      headerName: "Categoría",
      type: "singleSelect",
      minWidth: 150,
      flex: 3,
      valueGetter: (params: GridValueGetterParams<IDishGet>) =>
        params.row.categoryDish.nameCatDish,
      valueOptions: [
        ...new Set(data?.map((dish) => dish.categoryDish.nameCatDish)),
      ],
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      minWidth: 100,
      flex: 1,
      getActions: (categoryDish: GridRowParams<IDishGet>) => {
        return [
          <GridActionsCellItem
            key={categoryDish.row.id}
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            color="warning"
            onClick={() => {
              setSelectedDish(categoryDish.row);
              openDialogUpdate();
            }}
          />,
          <GridActionsCellItem
            key={categoryDish.row.id}
            icon={<Delete />}
            label="Delete"
            color="error"
            onClick={() => {
              setSelectedDish(categoryDish.row);
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
        rowHeight={130}
        columns={columns}
        loading={isLoading}
        rows={data}
        apiRef={gridApiRef}
      />

      <FormDialogDelete
        title={`¿Estás seguro de eliminar el plato "${selectedDish?.nameDish}"?`}
        open={openDialogD}
        handleCancel={() => {
          closeDialogDelete();
        }}
        handleSuccess={async () => {
          await deleteObject(`api/dish/${selectedDish?.id}`);
          handleLastPageDeletion(gridApiRef, data!.length);
          mutate("api/dish");
          closeDialogDelete();
          handleOpen("El plato se ha eliminado correctamente");
          setSelectedDish(null);
        }}
      />

      {openDialogU && (
        <DishUpdateForm
          setSelectedDish={setSelectedDish}
          open={openDialogU}
          closeDialog={() => {
            closeDialogUpdate();
          }}
          dish={selectedDish!}
        />
      )}
    </>
  );
};

export default DishTable;
