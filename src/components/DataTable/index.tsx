import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GridApiCommunity } from "@mui/x-data-grid/internals";
import { MutableRefObject } from "react";

interface IDataTableProps<T> {
  rows: T[] | undefined;
  columns: GridColDef[];
  loading: boolean;
  rowHeight?: number;
  apiRef?: MutableRefObject<GridApiCommunity>;
}

const DataTable = <T,>({
  rows,
  columns,
  loading,
  rowHeight,
  apiRef,
}: IDataTableProps<T>) => {
  return (
    <Box sx={{ display: "flex", marginY: 2, height: "370px" }}>
      <DataGrid
        apiRef={apiRef}
        sx={{ width: 100 }}
        rows={rows || []}
        columns={columns}
        rowHeight={rowHeight || 52}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        loading={loading}
        disableRowSelectionOnClick
        pageSizeOptions={[5]}
      />
    </Box>
  );
};

export default DataTable;
