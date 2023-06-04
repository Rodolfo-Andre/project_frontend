import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ComboBox from "@/components/ComboBox";
import employeeSchema from "@/schemas/Employee";
import { IEmployeeGet, IEmployeeCreateOrUpdate } from "@/interfaces/IEmployee";
import { IRoleGet } from "@/interfaces/IRole";
import { IUpdateFormProps } from "@/interfaces/IFormProps";
import { Formik } from "formik";
import { useSWRConfig } from "swr";
import { updateObject } from "@/services/HttpRequests";
import { onlyNumber, theme } from "@/utils";
import { ThemeProvider } from "@mui/material/styles";
import { showSuccessToastMessage } from "@/lib/Messages";

interface IEmployeeUpdateFormProps
  extends IUpdateFormProps<IEmployeeCreateOrUpdate, IEmployeeGet> {
  data: IRoleGet[];
}

const EmployeeUpdateForm = ({
  values: employee,
  setFormikRef,
  data,
}: IEmployeeUpdateFormProps) => {
  const { mutate } = useSWRConfig();

  return (
    <ThemeProvider theme={theme}>
      <Formik<IEmployeeCreateOrUpdate>
        initialValues={{
          firstName: employee.firstName,
          lastName: employee.lastName,
          phone: employee.phone,
          dni: employee.dni,
          roleId: employee.role.id,
          user: employee.user,
        }}
        innerRef={(ref) => setFormikRef(ref!)}
        validateOnChange={false}
        validationSchema={employeeSchema}
        onSubmit={async (employeeUpdate) => {
          await updateObject<IEmployeeGet, IEmployeeCreateOrUpdate>(
            `api/employee/${employee.id}`,
            employeeUpdate
          );
          mutate("api/employee");

          showSuccessToastMessage("El empleado se ha modificado correctamente");
        }}
      >
        {({
          values,
          errors,
          handleChange,
          setFieldValue,
          isSubmitting,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1.5} marginY={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="firstName"
                  type="text"
                  label="Nombres"
                  error={Boolean(errors.firstName)}
                  value={values.firstName}
                  onChange={handleChange}
                  helperText={errors.firstName}
                  disabled={isSubmitting}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastName"
                  type="text"
                  label="Apellidos"
                  error={Boolean(errors.lastName)}
                  value={values.lastName}
                  onChange={handleChange}
                  helperText={errors.lastName}
                  disabled={isSubmitting}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="phone"
                  type="text"
                  label="Teléfono"
                  error={Boolean(errors.phone)}
                  value={values.phone}
                  onChange={handleChange}
                  onKeyDown={onlyNumber}
                  helperText={errors.phone}
                  disabled={isSubmitting}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="email"
                  type="email"
                  label="Correo Electrónico"
                  error={Boolean(errors.user?.email)}
                  value={values.user?.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("user.email", e.target.value);
                  }}
                  helperText={errors.user?.email}
                  disabled={isSubmitting}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="dni"
                  type="text"
                  label="DNI"
                  error={Boolean(errors.dni)}
                  value={values.dni}
                  onChange={handleChange}
                  onKeyDown={onlyNumber}
                  helperText={errors.dni}
                  disabled={isSubmitting}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <ComboBox
                  value={employee.role}
                  id="id"
                  label="roleName"
                  values={data}
                  textFieldProps={{
                    label: "Rol",
                    error: Boolean(errors.roleId),
                    helperText: errors.roleId,
                    disabled: isSubmitting,
                  }}
                  disabled={isSubmitting}
                  handleChange={(role: IRoleGet | null) => {
                    setFieldValue("roleId", role?.id);
                  }}
                />
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </ThemeProvider>
  );
};

export default EmployeeUpdateForm;
