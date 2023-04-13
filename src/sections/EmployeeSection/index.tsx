import { Typography } from "@mui/material";
import { ContentBox, EmployeeTable } from "@/components";
import EmployeeForm from "@/components/EmployeeAddForm";

const EmployeeSection = () => {
  return (
    <ContentBox
      sxProps={{
        padding: 2,
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Empleados
      </Typography>

      <EmployeeForm />

      <EmployeeTable />
    </ContentBox>
  );
};

export default EmployeeSection;
