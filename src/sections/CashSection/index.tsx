import { Typography } from "@mui/material";
import { ContentBox } from "@/components";
import { CashTable, CashAddForm } from "@/features";

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
