import Delete from "@mui/icons-material/Delete";
import DeleteForever from "@mui/icons-material/DeleteForever";
import Typography from "@mui/material/Typography";
import Edit from "@mui/icons-material/Edit";
import TableBar from "@mui/icons-material/TableBar";
import DataTable from "@/components/DataTable";
import TableUpdateForm from "@/features/Table/TableUpdateForm";
import {
  useGridApiRef,
  GridActionsCellItem,
  GridRowParams,
  GridColDef,
} from "@mui/x-data-grid";
import { deleteObject } from "@/services/HttpRequests";
import { ITableGet, ITableUpdate } from "@/interfaces/ITable";
import { handleLastPageDeletion } from "@/utils";
import { showForm } from "@/lib/Forms";
import { showSuccessToastMessage } from "@/lib/Messages";
import { FormikProps } from "formik/dist/types";
import { useSWRConfig } from "swr";

interface ITableProps {
  data: ITableGet[];
}

const Table = ({ data }: ITableProps) => {
  let formikRef: FormikProps<ITableUpdate>;

  const { mutate } = useSWRConfig();

  const gridApiRef = useGridApiRef();

  const columns: GridColDef[] = [
    { field: "numTable", headerName: "Número de Mesa", minWidth: 140, flex: 1 },
    {
      field: "numSeats",
      headerName: "Cantidad de Asientos",
      minWidth: 160,
      flex: 5,
    },
    {
      field: "stateTable",
      headerName: "Estado de Mesa",
      minWidth: 140,
      flex: 5,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      minWidth: 100,
      flex: 1,
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
              showForm({
                title: "Actualizar Mesa",
                cancelButtonText: "CANCELAR",
                confirmButtonText: "ACTUALIZAR",
                customClass: {
                  confirmButton: "custom-confirm custom-confirm-update",
                },
                icon: (
                  <TableBar
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
                  <TableUpdateForm
                    setFormikRef={(ref) => (formikRef = ref)}
                    values={table.row}
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
            key={table.row.numTable}
            icon={<Delete />}
            label="Delete"
            color="error"
            onClick={() => {
              showForm({
                title: "Eliminar Mesa",
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
                    ¿Estás seguro de eliminar la mesa{" "}
                    {`"${table.row.numTable}"`}?
                  </Typography>
                ),
                preConfirm: async () => {
                  await deleteObject(`api/table/${table.row.numTable}`);
                  handleLastPageDeletion(gridApiRef, data.length);
                  mutate("api/table");

                  showSuccessToastMessage(
                    "La mesa se ha eliminado correctamente"
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
        apiRef={gridApiRef}
        columns={columns}
        rows={data}
        getRowId={(row) => row.numTable}
      />
    </>
  );
};

export default Table;
