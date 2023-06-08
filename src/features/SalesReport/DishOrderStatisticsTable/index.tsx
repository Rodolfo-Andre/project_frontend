import {
  GridColDef,
  GridValueFormatterParams,
  GridCellParams,
} from "@mui/x-data-grid";
import ContentCenter from "@/components/ContentCenter";
import DataTable from "@/components/DataTable";
import Image from "next/image";
import InsertPhotoOutlined from "@mui/icons-material/InsertPhotoOutlined";
import { IDishOrderStatistics } from "@/interfaces/IDish";

interface IDishOrderStatisticsTableProps {
  data: IDishOrderStatistics[];
}

const DishOrderStatisticsTable = ({ data }: IDishOrderStatisticsTableProps) => {
  const columns: GridColDef[] = [
    {
      field: "dishId",
      headerName: "ID",
      minWidth: 100,
      sortable: false,
      flex: 1,
    },
    {
      field: "imageDish",
      headerName: "Imagen",
      minWidth: 150,
      sortable: false,
      filterable: false,
      flex: 2,
      renderCell: (params: GridCellParams<IDishOrderStatistics>) => (
        <ContentCenter
          sxProps={{
            width: "100px",
            height: "100px",
            backgroundColor: "rgb(248, 249, 250)",
          }}
        >
          {params.row.imgDish ? (
            <Image
              src={params.row.imgDish}
              alt="Image"
              width={800}
              height={600}
              priority={true}
              style={{
                width: "100%",
                objectFit: "contain",
                height: "100%",
              }}
            />
          ) : (
            <InsertPhotoOutlined fontSize="large" />
          )}
        </ContentCenter>
      ),
    },
    {
      field: "nameDish",
      headerName: "Plato",
      minWidth: 200,
      sortable: false,
      flex: 3,
    },
    {
      field: "nameCatDish",
      headerName: "Categoría",
      sortable: false,
      minWidth: 200,
      flex: 3,
    },
    {
      field: "totalSales",
      headerName: "Venta Total",
      type: "number",
      headerAlign: "left",
      align: "left",
      sortable: false,
      minWidth: 160,
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams) => {
        return `S/. ${(params.value as number).toFixed(2)}`;
      },
    },
    {
      field: "quantityOfDishesSold",
      headerName: "Cantidad Vendidas",
      type: "number",
      headerAlign: "left",
      sortable: false,
      align: "left",
      minWidth: 150,
      flex: 1,
    },
  ];

  return (
    <>
      <DataTable
        rowHeight={130}
        columns={columns}
        rows={data}
        getRowId={(row) => row.dishId}
      />
    </>
  );
};

export default DishOrderStatisticsTable;
