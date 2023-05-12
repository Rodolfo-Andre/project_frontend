import Typography from "@mui/material/Typography";
import ContentBox from "@/components/ContentBox";
import DishTable from "@/features/Dish/DishTable";
import DishAddForm from "@/features/Dish/DishAddForm";

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
