import Box from "@mui/material/Box";
import { MutableRefObject } from "react";
import { DataGrid, GridColDef, GridRowIdGetter } from "@mui/x-data-grid";
import { GridApiCommunity } from "@mui/x-data-grid/internals";

interface IDataTableProps<T> {
  rows: T[] | undefined;
  columns: GridColDef[];
  loading: boolean;
  getRowId?: GridRowIdGetter<any>;
  rowHeight?: number;
  apiRef?: MutableRefObject<GridApiCommunity>;
}

const DataTable = <T,>({
  rows,
  columns,
  loading,
  getRowId,
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
        getRowId={getRowId}
        loading={loading}
        disableRowSelectionOnClick
        pageSizeOptions={[5]}
      />
    </Box>
  );
};

export default DataTable;
