import Typography from "@mui/material/Typography";
import ContentBox from "@/components/ContentBox";
import CashTable from "@/features/Cash/CashTable";
import CashAddForm from "@/features/Cash/CashAddForm";
import Box from "@mui/material/Box";

const CashSection = () => {
  return (
    <ContentBox>
      <Box sx={{ marginTop: 2, marginLeft: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Cajas
        </Typography>

        <CashAddForm />
      </Box>

      <CashTable />
    </ContentBox>
  );
};

export default CashSection;
