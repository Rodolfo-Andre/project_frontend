import ButtonAdd from "@/components/ButtonAdd";
import FormDialogPost from "@/components/FormDialogPost";
import ComboBox from "@/components/ComboBox";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import PersonAdd from "@mui/icons-material/PersonAdd";
import { useOpenClose } from "@/hooks";
import { IEmployeeGet, IEmployeeCreateOrUpdate, IRoleGet } from "@/interfaces";
import { employeeSchema } from "@/schemas";
import { useFormik } from "formik";
import { useSWRConfig } from "swr";
import { useContext } from "react";
import { AlertContext } from "@/contexts/AlertSuccess";
import { createObject } from "@/services/HttpRequests";

const initialValues: IEmployeeCreateOrUpdate = {
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

  const formik = useFormik<IEmployeeCreateOrUpdate>({
    initialValues,
    validationSchema: employeeSchema,
    onSubmit: async (newEmployee) => {
      await createObject<IEmployeeGet, IEmployeeCreateOrUpdate>(
        "api/employee",
        newEmployee
      );
      mutate("api/employee");
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
      </FormDialogPost>
    </>
  );
};

export default EmployeeAddForm;
