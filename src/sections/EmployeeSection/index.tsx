import { Typography } from "@mui/material";
import { ContentBox, EmployeeDataGrid } from "@/components";
import EmployeeForm from "@/components/EmployeeAddForm";

const EmployeeSection = () => {
  return (
    <ContentBox
      sxProps={{
        padding: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Empleados
      </Typography>

      <EmployeeForm />

      <EmployeeDataGrid />
    </ContentBox>
  );
};

export default EmployeeSection;
