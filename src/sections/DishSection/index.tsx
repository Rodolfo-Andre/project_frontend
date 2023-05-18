import Typography from "@mui/material/Typography";
import ContentBox from "@/components/ContentBox";
import DishTable from "@/features/Dish/DishTable";
import DishAddForm from "@/features/Dish/DishAddForm";
import Box from "@mui/material/Box";

const DishSection = () => {
  return (
    <ContentBox>
      <Box sx={{ marginTop: 2, marginLeft: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Platos
        </Typography>

        <DishAddForm />
      </Box>

      <DishTable />
    </ContentBox>
  );
};

export default DishSection;
