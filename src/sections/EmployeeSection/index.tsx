import Typography from "@mui/material/Typography";
import ContentBox from "@/components/ContentBox";
import EmployeeTable from "@/features/Employee/EmployeeTable";
import EmployeeAddForm from "@/features/Employee/EmployeeAddForm";

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

      <EmployeeAddForm />

      <EmployeeTable />
    </ContentBox>
  );
};

export default EmployeeSection;
