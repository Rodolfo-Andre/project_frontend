import Delete from "@mui/icons-material/Delete";
import DataTable from "@/components/DataTable";
import DeleteForever from "@mui/icons-material/DeleteForever";
import Typography from "@mui/material/Typography";
import { useSWRConfig } from "swr";
import {
  useGridApiRef,
  GridActionsCellItem,
  GridRowParams,
  GridColDef,
} from "@mui/x-data-grid";
import { deleteObject } from "@/services/HttpRequests";
import { ICashGet } from "@/interfaces/ICash";
import { showForm } from "@/lib/Forms";
import { showSuccessToastMessage } from "@/lib/Messages";
import { handleLastPageDeletion } from "@/utils";

interface ICashTableProps {
  data: ICashGet[];
}

const CashTable = ({ data }: ICashTableProps) => {
  const { mutate } = useSWRConfig();

  const gridApiRef = useGridApiRef();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", minWidth: 100, flex: 12 },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      minWidth: 100,
      flex: 1,
      getActions: (cash: GridRowParams<ICashGet>) => {
        return [
          <GridActionsCellItem
            key={cash.row.id}
            icon={<Delete />}
            label="Delete"
            color="error"
            onClick={async () => {
              showForm({
                title: "Eliminar Caja",
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
                    ¿Estás seguro de eliminar la caja {`"${cash.row.id}"`}?
                  </Typography>
                ),
                preConfirm: async () => {
                  await deleteObject(`api/cash/${cash.row.id}`);
                  handleLastPageDeletion(gridApiRef, data.length);
                  mutate("api/cash");

                  showSuccessToastMessage(
                    "La caja se ha eliminado correctamente"
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

export default CashTable;
