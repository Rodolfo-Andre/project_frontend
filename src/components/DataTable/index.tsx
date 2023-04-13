import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface IDataTableProps<T> {
  rows: T[] | undefined;
  columns: GridColDef[];
  loading: boolean;
}

const DataTable = <T,>({ rows, columns, loading }: IDataTableProps<T>) => {
  return (
    <Box sx={{ display: "flex", marginY: 2 }}>
      <DataGrid
        sx={{ width: 100 }}
        rows={rows || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        loading={loading}
        autoHeight
        disableRowSelectionOnClick
        pageSizeOptions={[5]}
      />
    </Box>
  );
};

export default DataTable;
