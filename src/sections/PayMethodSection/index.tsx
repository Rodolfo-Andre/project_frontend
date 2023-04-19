import { Typography } from "@mui/material";
import { ContentBox } from "@/components";
import { PayMethodTable, PayMethodAddForm } from "@/features";

const PayMethodSection = () => {
  return (
    <ContentBox
      sxProps={{
        padding: 2,
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Métodos de Pagos
      </Typography>

      <PayMethodAddForm />

      <PayMethodTable />
    </ContentBox>
  );
};

export default PayMethodSection;
