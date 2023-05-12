import Typography from "@mui/material/Typography";
import ContentBox from "@/components/ContentBox";
import PayMethodTable from "@/features/PayMethod/PayMethodTable";
import PayMethodAddForm from "@/features/PayMethod/PayMethodAddForm";

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
