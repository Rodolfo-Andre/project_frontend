import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Payment from "@mui/icons-material/Payment";
import DataTable from "@/components/DataTable";
import DeleteForever from "@mui/icons-material/DeleteForever";
import PayMethodUpdateForm from "@/features/PayMethod/PayMethodUpdateForm";
import {
  useGridApiRef,
  GridActionsCellItem,
  GridRowParams,
  GridColDef,
} from "@mui/x-data-grid";
import { deleteObject, getObject } from "@/services/HttpRequests";
import { IPayMethodGet, IPayMethodPrincipal } from "@/interfaces/IPayMethod";
import { handleLastPageDeletion } from "@/utils";
import { showForm } from "@/lib/Forms";
import { showErrorMessage, showSuccessToastMessage } from "@/lib/Messages";
import { FormikProps } from "formik/dist/types";
import { useSWRConfig } from "swr";

interface IPayMethodTableProps {
  data: IPayMethodGet[];
}

const PayMethodTable = ({ data }: IPayMethodTableProps) => {
  let formikRef: FormikProps<IPayMethodPrincipal>;

  const { mutate } = useSWRConfig();

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
            color="warning"
            onClick={() => {
              showForm({
                title: "Actualizar Método de Pago",
                cancelButtonText: "CANCELAR",
                confirmButtonText: "ACTUALIZAR",
                customClass: {
                  confirmButton: "custom-confirm custom-confirm-update",
                },
                icon: (
                  <Payment
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
                  <PayMethodUpdateForm
                    setFormikRef={(ref) => (formikRef = ref)}
                    values={payMethod.row}
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
            key={payMethod.row.id}
            icon={<Delete />}
            label="Delete"
            color="error"
            onClick={async () => {
              const count = await getObject<number>(
                `api/PayMethod/${payMethod.id}/number-vouchers-details`
              );

              if (count > 0) {
                showErrorMessage({
                  title: `NO SE PUEDE ELIMINAR EL MÉTODO DE PAGO - ${payMethod.id}`,
                  contentHtml: `No es posible eliminar el método de pago debido a que se encontró ${count} comprobrante${
                    count !== 1 ? "s" : ""
                  } de pago asignado a dicho método.`,
                });

                return;
              }

              showForm({
                title: "Eliminar Método de Pago",
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
                    ¿Estás seguro de eliminar el método de pago{" "}
                    {`"${payMethod.row.paymethod}"`}?
                  </Typography>
                ),
                preConfirm: async () => {
                  await deleteObject(`api/paymethod/${payMethod.row.id}`);
                  handleLastPageDeletion(gridApiRef, data.length);
                  mutate("api/paymethod");

                  showSuccessToastMessage(
                    "El método de pago se ha eliminado correctamente"
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

export default PayMethodTable;
