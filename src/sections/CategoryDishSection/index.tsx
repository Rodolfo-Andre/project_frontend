import Typography from "@mui/material/Typography";
import ContentBox from "@/components/ContentBox";
import CategoryDishAddForm from "@/features/CategoryDish/CategoryDishAddForm";
import CategoryDishTable from "@/features/CategoryDish/CategoryDishTable";
import Box from "@mui/material/Box";

const CategoryDishSection = () => {
  return (
    <ContentBox>
      <Box sx={{ marginTop: 2, marginLeft: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Categorías de Platos
        </Typography>

        <CategoryDishAddForm />
      </Box>

      <CategoryDishTable />
    </ContentBox>
  );
};

export default CategoryDishSection;
