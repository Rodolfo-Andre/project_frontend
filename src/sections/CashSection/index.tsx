import Typography from "@mui/material/Typography";
import ContentBox from "@/components/ContentBox";
import CashTable from "@/features/Cash/CashTable";
import CashAddForm from "@/features/Cash/CashAddForm";

const CashSection = () => {
  return (
    <ContentBox
      sxProps={{
        padding: 2,
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Cajas
      </Typography>

      <CashAddForm />

      <CashTable />
    </ContentBox>
  );
};

export default CashSection;
