import Typography from "@mui/material/Typography";
import ContentBox from "@/components/ContentBox";
import Table from "@/features/Table/Table";
import TableAddForm from "@/features/Table/TableAddForm";

const TableSection = () => {
  return (
    <ContentBox
      sxProps={{
        padding: 2,
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Mesas
      </Typography>

      <TableAddForm />

      <Table />
    </ContentBox>
  );
};

export default TableSection;
