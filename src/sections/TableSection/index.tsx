import Typography from "@mui/material/Typography";
import ContentBox from "@/components/ContentBox";
import Table from "@/features/Table/Table";
import TableAddForm from "@/features/Table/TableAddForm";
import Box from "@mui/material/Box";

const TableSection = () => {
  return (
    <ContentBox>
      <Box sx={{ marginTop: 2, marginLeft: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Mesas
        </Typography>

        <TableAddForm />
      </Box>

      <Table />
    </ContentBox>
  );
};

export default TableSection;
