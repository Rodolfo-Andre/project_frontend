import { IVoucherReportGet } from "@/interfaces/IVoucherReport";
import InsertDriveFile from "@mui/icons-material/InsertDriveFile";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import {
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
  GridValueGetterParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { AxiosServices } from "@/services";
import { DataTable } from "@/components";
import { Typography } from "@mui/material";

interface IVoucherReportTableProps {
  data: IVoucherReportGet[];
}

const VoucherReportTable = ({ data }: IVoucherReportTableProps) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "Número de Voucher", minWidth: 140, flex: 1 },
    {
      field: "customerFullName",
      headerName: "Cliente",
      minWidth: 250,
      flex: 2,
      valueGetter: (params: GridValueGetterParams<IVoucherReportGet>) =>
        `${params.row.customer.firstName} ${params.row.customer.lastName}`,
    },
    {
      field: "waiterFullName",
      headerName: "Mesero",
      minWidth: 250,
      flex: 2,
      valueGetter: (params: GridValueGetterParams<IVoucherReportGet>) =>
        `${params.row.employee.firstName} ${params.row.employee.lastName}`,
    },
    {
      field: "dateIssued",
      headerName: "Fecha de Emisión",
      type: "dateTime",
      minWidth: 160,
      flex: 1,
      valueGetter: (params: GridValueGetterParams<IVoucherReportGet>) =>
        dayjs(params.row.dateIssued).toDate(),
    },
    {
      field: "voucherType",
      headerName: "Tipo de Comprobante",
      minWidth: 160,
      flex: 1,
      valueGetter: (params: GridValueGetterParams<IVoucherReportGet>) =>
        params.row.voucherType.name,
    },

    {
      field: "cash",
      headerName: "Caja",
      minWidth: 100,
      flex: 1,
      valueGetter: (params: GridValueGetterParams<IVoucherReportGet>) =>
        params.row.cash.id,
    },
    {
      field: "totalPrice",
      headerName: "Precio Total",
      type: "number",
      headerAlign: "left",
      align: "left",
      minWidth: 140,
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams) =>
        `S/. ${(params.value as number).toFixed(2)}`,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      minWidth: 100,
      flex: 1,
      getActions: (voucherReport: GridRowParams<IVoucherReportGet>) => {
        return [
          <GridActionsCellItem
            key={voucherReport.row.id}
            icon={
              <>
                <Box
                  sx={{
                    display: "flex",
                    bgcolor: "error.main",
                    color: "white",
                    padding: "0.5rem 0.7rem",
                    borderRadius: 1,
                  }}
                >
                  <InsertDriveFile />
                  <Typography>PDF</Typography>
                </Box>
              </>
            }
            label="PDF"
            color="error"
            onClick={async () => {
              const { isDismissed } = await Swal.fire({
                title: "Cargando PDF ...",
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: async () => {
                  Swal.showLoading();

                  console.log(voucherReport.row.id);
                  const { data } = await AxiosServices.get(
                    `api/report/voucher/${voucherReport.row.id}`,
                    { responseType: "blob" }
                  );

                  const url = URL.createObjectURL(data);

                  window.open(url, "_blank");

                  URL.revokeObjectURL(url);
                  Swal.close();
                },
              });

              if (isDismissed) {
                Swal.fire({
                  icon: "success",
                  title:
                    "Carga completada! Ya puedes visualizar el comprobante de pago",
                });
              }
            }}
          />,
        ];
      },
    },
  ];

  return (
    <>
      <DataTable columns={columns} rows={data} />
    </>
  );
};

export default VoucherReportTable;
