import { ButtonAdd, RoleComboBox, FormDialogPost } from "@/components";
import { useOpenClose } from "@/hooks";
import { IEmployeeGet, IEmployeePost } from "@/interfaces/IEmployee";
import { employeePostSchema } from "@/schemas/Employee";
import { Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { IRoleGet } from "@/interfaces/IRole";
import { PersonAdd } from "@mui/icons-material";
import { useSWRConfig } from "swr";
import { useContext } from "react";
import { AlertContext } from "@/contexts/AlertSuccess";
import { createObject } from "@/services/HttpRequests";

const initialValues: IEmployeePost = {
  firstName: "",
  lastName: "",
  phone: "",
  user: {
    email: "",
  },
};

const EmployeeAddForm = () => {
  const { mutate } = useSWRConfig();
  const { handleOpen } = useContext(AlertContext);
  const [open, openDialog, closeDialog] = useOpenClose(false);

  const formik = useFormik<IEmployeePost>({
    initialValues,
    validationSchema: employeePostSchema,
    onSubmit: async (newEmployee) => {
      await createObject<IEmployeeGet, IEmployeePost>(
        "/api/employees",
        newEmployee
      );
      mutate("api/employees");
      closeDialog();
      handleOpen("El empleado se ha registrado correctamente");
      formik.resetForm();
    },
    validateOnChange: false,
  });

  return (
    <>
      <ButtonAdd text="Añadir Empleado" openDialog={openDialog} />

      <FormDialogPost
        Icon={PersonAdd}
        open={open}
        title="Añadir Empleado"
        handleCancel={() => {
          closeDialog();
          formik.resetForm();
        }}
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
              <RoleComboBox
                value={null}
                handleChange={(role: IRoleGet | null) => {
                  formik.setFieldValue("roleId", role?.id);
                }}
                textFieldProps={{
                  label: "Rol",
                  error: Boolean(formik.errors.roleId),
                  helperText: formik.errors.roleId,
                  disabled: formik.isSubmitting,
                }}
              />
            </Grid>
          </Grid>
        </form>
      </FormDialogPost>
    </>
  );
};

export default EmployeeAddForm;
