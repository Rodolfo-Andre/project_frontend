import { Typography } from "@mui/material";
import { ContentBox } from "@/components";
import { DishTable, DishAddForm } from "@/features";

const DishSection = () => {
  return (
    <ContentBox
      sxProps={{
        padding: 2,
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Platos
      </Typography>

      <DishAddForm />

      <DishTable />
    </ContentBox>
  );
};

export default DishSection;
