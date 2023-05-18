import Typography from "@mui/material/Typography";
import ContentBox from "@/components/ContentBox";
import EmployeeTable from "@/features/Employee/EmployeeTable";
import EmployeeAddForm from "@/features/Employee/EmployeeAddForm";
import Box from "@mui/material/Box";

const EmployeeSection = () => {
  return (
    <ContentBox>
      <Box sx={{ marginTop: 2, marginLeft: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Empleados
        </Typography>

        <EmployeeAddForm />
      </Box>

      <EmployeeTable />
    </ContentBox>
  );
};

export default EmployeeSection;
