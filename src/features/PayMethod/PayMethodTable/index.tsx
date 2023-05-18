import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import FormDialogDelete from "@/components/FormDialogDelete";
import DataTable from "@/components/DataTable";
import PayMethodUpdateForm from "@/features/PayMethod/PayMethodUpdateForm";
import {
  useGridApiRef,
  GridActionsCellItem,
  GridRowParams,
  GridColDef,
} from "@mui/x-data-grid";
import { useOpenClose } from "@/hooks";
import { useContext, useState } from "react";
import { AlertContext } from "@/contexts/AlertSuccess";
import { deleteObject, fetchAll } from "@/services/HttpRequests";
import { IPayMethodGet } from "@/interfaces";
import { handleLastPageDeletion } from "@/utils";
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
    { field: "id", headerName: "ID", minWidth: 100, flex: 1 },
    {
      field: "paymethod",
      headerName: "Método de Pago",
      minWidth: 250,
      flex: 11,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      minWidth: 100,
      flex: 1,
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
