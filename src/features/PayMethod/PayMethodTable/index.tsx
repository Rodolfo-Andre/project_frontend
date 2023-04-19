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
import { IPayMethodGet } from "@/interfaces";
import { handleLastPageDeletion } from "@/utils";
import { PayMethodUpdateForm } from "@/features";
import useSWR, { useSWRConfig } from "swr";

const PayMethodTable = () => {
  const { data, isLoading } = useSWR("api/paymethod", () =>
    fetchAll<IPayMethodGet>("api/paymethod")
  );
  const { mutate } = useSWRConfig();
  const { handleOpen } = useContext(AlertContext);
  const [selectedPayMethod, setSelectedPayMethod] =
    useState<IPayMethodGet | null>(null);
  const [openDialogD, openDialogDelete, closeDialogDelete] =
    useOpenClose(false);
  const [openDialogU, openDialogUpdate, closeDialogUpdate] =
    useOpenClose(false);
  const gridApiRef = useGridApiRef();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "paymethod", headerName: "Método de Pago", width: 250 },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 100,
      getActions: (payMethod: GridRowParams<IPayMethodGet>) => {
        return [
          <GridActionsCellItem
            key={payMethod.row.id}
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            color="warning"
            onClick={() => {
              setSelectedPayMethod(payMethod.row);
              openDialogUpdate();
            }}
          />,
          <GridActionsCellItem
            key={payMethod.row.id}
            icon={<Delete />}
            label="Delete"
            color="error"
            onClick={() => {
              setSelectedPayMethod(payMethod.row);
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
        title={`¿Estás seguro de eliminar el método de pago "${selectedPayMethod?.paymethod}"?`}
        open={openDialogD}
        handleCancel={() => {
          closeDialogDelete();
        }}
        handleSuccess={async () => {
          await deleteObject(`api/paymethod/${selectedPayMethod?.id}`);
          handleLastPageDeletion(gridApiRef, data!.length);
          mutate("api/paymethod");
          closeDialogDelete();
          handleOpen("El método de pago se ha eliminado correctamente");
          setSelectedPayMethod(null);
        }}
      />

      {openDialogU && (
        <PayMethodUpdateForm
          setSelectedPayMethod={setSelectedPayMethod}
          open={openDialogU}
          closeDialog={() => {
            closeDialogUpdate();
          }}
          payMethod={selectedPayMethod!}
        />
      )}
    </>
  );
};

export default PayMethodTable;
