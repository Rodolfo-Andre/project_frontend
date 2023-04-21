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
import { ITableGet } from "@/interfaces";
import { handleLastPageDeletion } from "@/utils";
import { TableUpdateForm } from "@/features";
import useSWR, { useSWRConfig } from "swr";

const Table = () => {
  const { data, isLoading } = useSWR("api/table", () =>
    fetchAll<ITableGet>("api/table")
  );
  const { mutate } = useSWRConfig();
  const { handleOpen } = useContext(AlertContext);
  const [selectedTable, setSelectedTable] = useState<ITableGet | null>(null);
  const [openDialogD, openDialogDelete, closeDialogDelete] =
    useOpenClose(false);
  const [openDialogU, openDialogUpdate, closeDialogUpdate] =
    useOpenClose(false);
  const gridApiRef = useGridApiRef();

  const columns: GridColDef[] = [
    { field: "numTable", headerName: "Número de Mesa", width: 200 },
    { field: "numSeats", headerName: "Cantidad de Asientos", width: 200 },
    { field: "stateTable", headerName: "Estado de Mesa", width: 200 },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 100,
      getActions: (table: GridRowParams<ITableGet>) => {
        if (table.row.stateTable === "Ocupado") return [];

        return [
          <GridActionsCellItem
            key={table.row.numTable}
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            color="warning"
            onClick={() => {
              setSelectedTable(table.row);
              openDialogUpdate();
            }}
          />,
          <GridActionsCellItem
            key={table.row.numTable}
            icon={<Delete />}
            label="Delete"
            color="error"
            onClick={() => {
              setSelectedTable(table.row);
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
        getRowId={(row) => row.numSeats}
      />

      <FormDialogDelete
        title={`¿Estás seguro de eliminar la mesa "${selectedTable?.numTable}"?`}
        open={openDialogD}
        handleCancel={() => {
          closeDialogDelete();
        }}
        handleSuccess={async () => {
          await deleteObject(`api/table/${selectedTable?.numTable}`);
          handleLastPageDeletion(gridApiRef, data!.length);
          mutate("api/table");
          closeDialogDelete();
          handleOpen("La mesa se ha eliminado correctamente");
          setSelectedTable(null);
        }}
      />

      {openDialogU && (
        <TableUpdateForm
          setSelectedTable={setSelectedTable}
          open={openDialogU}
          closeDialog={() => {
            closeDialogUpdate();
          }}
          table={selectedTable!}
        />
      )}
    </>
  );
};

export default Table;
