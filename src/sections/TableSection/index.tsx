import { Typography } from "@mui/material";
import { ContentBox } from "@/components";
import { Table, TableAddForm } from "@/features";

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
