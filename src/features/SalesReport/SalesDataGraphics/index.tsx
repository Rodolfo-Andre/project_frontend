import Box from "@mui/material/Box";
import ContentBox from "@/components/ContentBox";
import dayjs from "dayjs";
import { Bar } from "react-chartjs-2";
import { colorsForChart, colorsWithAlphaForChart } from "@/utils";
import { ISalesDataPerDate } from "@/interfaces/IVoucherReport";

interface ISaleDataGraphicsProps {
  data: ISalesDataPerDate[];
}

const SaleDataGraphics = ({ data }: ISaleDataGraphicsProps) => {
  const chart1 = {
    labels: data.map((d) => dayjs(d.dateIssued).format("DD/MM/YYYY")),
    datasets: [
      {
        label: "Monto recaudado",
        data: data.map((d) => d.accumulatedSales),
        hoverOffset: 4,
        backgroundColor: colorsWithAlphaForChart,
        borderColor: colorsForChart,
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns:
          " repeat(auto-fit, minmax(clamp(250px, 320px + 5vw  , 500px), 1fr));",
      }}
    >
      <ContentBox
        sxProps={{
          padding: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Bar
          data={chart1}
          className="chart"
          options={{
            scales: {
              y: {
                ticks: {
                  callback: (value) => `S/. ${value}`,
                },
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => `S/. ${context.formattedValue}`,
                },
              },
              title: {
                text: "LOS PLATOS MÁS VENDIDOS",
                display: true,
                font: { size: 24 },
              },
            },
          }}
        />
      </ContentBox>
    </Box>
  );
};

export default SaleDataGraphics;
