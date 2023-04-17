import { Typography } from "@mui/material";
import { ContentBox } from "@/components";
import { CategoryDishTable, CategoryDishAddForm } from "@/features";

const CategoryDishSection = () => {
  return (
    <ContentBox
      sxProps={{
        padding: 2,
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Categorías de Platos
      </Typography>

      <CategoryDishAddForm />

      <CategoryDishTable />
    </ContentBox>
  );
};

export default CategoryDishSection;
