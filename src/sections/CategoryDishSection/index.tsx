import Typography from "@mui/material/Typography";
import ContentBox from "@/components/ContentBox";
import CategoryDishAddForm from "@/features/CategoryDish/CategoryDishAddForm";
import CategoryDishTable from "@/features/CategoryDish/CategoryDishTable";

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
