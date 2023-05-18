import Typography from "@mui/material/Typography";
import ContentBox from "@/components/ContentBox";
import PayMethodTable from "@/features/PayMethod/PayMethodTable";
import PayMethodAddForm from "@/features/PayMethod/PayMethodAddForm";
import Box from "@mui/material/Box";

const PayMethodSection = () => {
  return (
    <ContentBox>
      <Box sx={{ marginTop: 2, marginLeft: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Métodos de Pagos
        </Typography>

        <PayMethodAddForm />
      </Box>

      <PayMethodTable />
    </ContentBox>
  );
};

export default PayMethodSection;
