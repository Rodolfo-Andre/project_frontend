import Delete from "@mui/icons-material/Delete";
import DeleteForever from "@mui/icons-material/DeleteForever";
import Typography from "@mui/material/Typography";
import Edit from "@mui/icons-material/Edit";
import Help from "@mui/icons-material/Help";
import TableBar from "@mui/icons-material/TableBar";
import DataTable from "@/components/DataTable";
import TableUpdateForm from "@/features/Table/TableUpdateForm";
import SeverityPill from "@/components/SeverityPill";
import Colors from "@/interfaces/Colors";
import {
  useGridApiRef,
  GridActionsCellItem,
  GridRowParams,
  GridColDef,
} from "@mui/x-data-grid";
import { deleteObject, getObject } from "@/services/HttpRequests";
import { ITableGet, ITableUpdate } from "@/interfaces/ITable";
import { handleLastPageDeletion } from "@/utils";
import { showForm } from "@/lib/Forms";
import {
  showErrorMessage,
  showInformationMessage,
  showSuccessToastMessage,
} from "@/lib/Messages";
import { FormikProps } from "formik/dist/types";
import { useSWRConfig } from "swr";

interface ITableProps {
  data: ITableGet[];
}

const statusMap = {
  Libre: "success",
  Ocupado: "error",
};

const Table = ({ data }: ITableProps) => {
  let formikRef: FormikProps<ITableUpdate>;

  const { mutate } = useSWRConfig();

  const gridApiRef = useGridApiRef();

  const columns: GridColDef[] = [
    { field: "numTable", headerName: "Número de Mesa", minWidth: 140, flex: 1 },
    {
      field: "numSeats",
      type: "number",
      headerAlign: "left",
      align: "left",
      headerName: "Cantidad de Asientos",
      minWidth: 160,
      flex: 5,
    },
    {
      field: "stateTable",
      headerName: "Estado de Mesa",
      minWidth: 140,
      flex: 5,
      renderCell: (params) => {
        return (
          <SeverityPill
            color={statusMap[params.value as keyof typeof statusMap] as Colors}
          >
            {params.value}
          </SeverityPill>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      minWidth: 100,
      flex: 1,
      getActions: (table: GridRowParams<ITableGet>) => {
        if (table.row.stateTable === "Ocupado")
          return [
            <GridActionsCellItem
              key={table.row.numTable}
              icon={<Help />}
              label="Info"
              color="primary"
              onClick={() => {
                showInformationMessage({
                  title: `NO PUEDES REALIZAR NINGUNA ACCIÓN EN LA MESA`,
                  contentHtml: `Debido a que la mesa está ocupada, no es posible eliminar ni actualizar`,
                });
              }}
            />,
          ];

        return [
          <GridActionsCellItem
            key={table.row.numTable}
            icon={<Edit />}
            label="Edit"
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
            onClick={async () => {
              const count = await getObject<number>(
                `api/Table/${table.id}/number-commands`
              );

              if (count > 0) {
                showErrorMessage({
                  title: `NO SE PUEDE ELIMINAR LA MESA - ${table.id}`,
                  contentHtml: `No es posible eliminar la mesa debido a que se encontró ${count} comanda${
                    count !== 1 ? "s" : ""
                  } asignado a dicha mesa.`,
                });

                return;
              }

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
