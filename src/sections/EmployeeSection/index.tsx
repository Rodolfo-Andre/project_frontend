import Typography from "@mui/material/Typography";
import ContentBox from "@/components/ContentBox";
import EmployeeTable from "@/features/Employee/EmployeeTable";
import EmployeeAddForm from "@/features/Employee/EmployeeAddForm";
import ButtonAdd from "@/components/ButtonAdd";
import Box from "@mui/material/Box";
import PersonAdd from "@mui/icons-material/PersonAdd";
import useSWR from "swr";
import { FormikProps } from "formik/dist/types";
import { IEmployeeCreateOrUpdate, IEmployeeGet } from "@/interfaces/IEmployee";
import { showForm } from "@/lib/Forms";
import { IRoleGet } from "@/interfaces/IRole";
import { fetchAll } from "@/services/HttpRequests";
import LoaderComponent from "@/components/LoaderComponent";

const EmployeeSection = () => {
  let formikRef: FormikProps<IEmployeeCreateOrUpdate>;
  const { data: employees, isLoading: isLoadingEmployees } = useSWR(
    "api/employee",
    () => fetchAll<IEmployeeGet>("api/employee")
  );

  const { data: roles, isLoading: isLoadingRoles } = useSWR("api/role", () =>
    fetchAll<IRoleGet>("api/role")
  );

  if (isLoadingEmployees || isLoadingRoles) return <LoaderComponent />;

  return (
    <ContentBox>
      <Box sx={{ marginTop: 2, marginLeft: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Empleados
        </Typography>

        <ButtonAdd
          text="Añadir Empleado"
          openDialog={() => {
            showForm({
              title: "Añadir Empleado",
              cancelButtonText: "CANCELAR",
              confirmButtonText: "AÑADIR",
              customClass: {
                confirmButton: "custom-confirm custom-confirm-create",
              },
              icon: (
                <PersonAdd
                  sx={{
                    display: "block",
                    margin: "auto",
                    fontSize: "5rem",
                    color: "#0D6EFD",
                  }}
                  color="primary"
                />
              ),
              contentHtml: (
                <EmployeeAddForm
                  data={roles!}
                  setFormikRef={(ref) => (formikRef = ref)}
                />
              ),
              preConfirm: async () => {
                await formikRef.submitForm();
                if (formikRef && !formikRef.isValid) {
                  return false;
                }
              },
            });
          }}
        />
      </Box>

      <EmployeeTable data={employees!} roles={roles!} />
    </ContentBox>
  );
};

export default EmployeeSection;
