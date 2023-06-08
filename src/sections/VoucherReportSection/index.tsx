import { IVoucherReportGet } from "@/interfaces/IVoucherReport";
import LoaderComponent from "@/components/LoaderComponent";
import useSWR from "swr";
import ContentBox from "@/components/ContentBox";
import Box from "@mui/material/Box";
import VoucherReportTable from "@/features/VoucherReport/VoucherReportTable";
import Typography from "@mui/material/Typography";
import { fetchAll } from "@/services/HttpRequests";

const VoucherReportSection = () => {
  const { data: vouchers, isLoading: isLoadingVouchers } = useSWR(
    "api/voucher",
    () => fetchAll<IVoucherReportGet>("api/voucher")
  );

  if (isLoadingVouchers) return <LoaderComponent />;

  return (
    <ContentBox>
      <Box sx={{ marginTop: 2, marginX: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Reporte de Comprobantes de Pago
        </Typography>
      </Box>

      <VoucherReportTable data={vouchers!} />
    </ContentBox>
  );
};

export default VoucherReportSection;
