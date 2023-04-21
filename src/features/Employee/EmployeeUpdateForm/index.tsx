import { IEmployeeGet, IEmployeeCreateOrUpdate } from "@/interfaces/IEmployee";
import { employeeCreateOrUpdateSchema } from "@/schemas/Employee";
import { Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { IRoleGet } from "@/interfaces/IRole";
import { Person } from "@mui/icons-material";
import { useSWRConfig } from "swr";
import { SetStateAction, useContext } from "react";
import { AlertContext } from "@/contexts/AlertSuccess";
import { updateObject } from "@/services/HttpRequests";
import { ComboBox, FormDialogUpdate } from "@/components";

interface IEmployeeFormUpdateProps {
  employee: IEmployeeGet;
  open: boolean;
  closeDialog: () => void;
  setSelectedEmployee: (value: SetStateAction<IEmployeeGet | null>) => void;
}

const EmployeeUpdateForm = ({
  employee,
  open,
  closeDialog,
  setSelectedEmployee,
}: IEmployeeFormUpdateProps) => {
  const { mutate } = useSWRConfig();
  const { handleOpen } = useContext(AlertContext);
  const formik = useFormik<IEmployeeCreateOrUpdate>({
    initialValues: {
      firstName: employee.firstName,
      lastName: employee.lastName,
      phone: employee.phone,
      roleId: employee.role.id,
      user: employee.user,
    },
    validationSchema: employeeCreateOrUpdateSchema,
    onSubmit: async (employeeUpdate) => {
      await updateObject<IEmployeeGet, IEmployeeCreateOrUpdate>(
        `api/employee/${employee.id}`,
        employeeUpdate
      );
      mutate("api/employee");
      closeDialog();
      handleOpen("El empleado se ha modificado correctamente");
      formik.resetForm();
      setSelectedEmployee(null);
    },
    validateOnChange: false,
  });

  return (
    <>
      <FormDialogUpdate
        Icon={Person}
        open={open}
        title="Actualizar Empleado"
        handleCancel={() => {
          closeDialog();
          formik.resetForm();
        }}
        isSubmitting={formik.isSubmitting}
        handleSuccess={() => {
          formik.handleSubmit();
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1.5} marginY={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="firstName"
                type="text"
                label="Nombres"
                error={Boolean(formik.errors.firstName)}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                helperText={formik.errors.firstName}
                disabled={formik.isSubmitting}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="lastName"
                type="text"
                label="Apellidos"
                error={Boolean(formik.errors.lastName)}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                helperText={formik.errors.lastName}
                disabled={formik.isSubmitting}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="phone"
                type="text"
                label="Teléfono"
                error={Boolean(formik.errors.phone)}
                value={formik.values.phone}
                onChange={formik.handleChange}
                helperText={formik.errors.phone}
                disabled={formik.isSubmitting}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                id="email"
                type="email"
                label="Correo Electrónico"
                error={Boolean(formik.errors.user?.email)}
                value={formik.values.user?.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  formik.setFieldValue("user.email", e.target.value);
                }}
                helperText={formik.errors.user?.email}
                disabled={formik.isSubmitting}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <ComboBox
                value={formik.values.roleId}
                id="id"
                label="roleName"
                url="api/role"
                textFieldProps={{
                  label: "Rol",
                  error: Boolean(formik.errors.roleId),
                  helperText: formik.errors.roleId,
                  disabled: formik.isSubmitting,
                }}
                disabled={formik.isSubmitting}
                handleChange={(role: IRoleGet | null) => {
                  formik.setFieldValue("roleId", role?.id);
                }}
              />
            </Grid>
          </Grid>
        </form>
      </FormDialogUpdate>
    </>
  );
};

export default EmployeeUpdateForm;
