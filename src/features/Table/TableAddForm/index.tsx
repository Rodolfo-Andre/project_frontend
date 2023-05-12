import ButtonAdd from "@/components/ButtonAdd";
import FormDialogPost from "@/components/FormDialogPost";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import TableBar from "@mui/icons-material/TableBar";
import { useOpenClose } from "@/hooks";
import { useFormik } from "formik";
import { useSWRConfig } from "swr";
import { useContext } from "react";
import { AlertContext } from "@/contexts/AlertSuccess";
import { createObject } from "@/services/HttpRequests";
import { tableCreateSchema } from "@/schemas";
import { ITableGet, ITablePrincipal } from "@/interfaces";

const initialValues: ITablePrincipal = {
  numSeats: 0,
};

const TableAddForm = () => {
  const { mutate } = useSWRConfig();
  const { handleOpen } = useContext(AlertContext);
  const [open, openDialog, closeDialog] = useOpenClose(false);

  const formik = useFormik<ITablePrincipal>({
    initialValues,
    validationSchema: tableCreateSchema,
    onSubmit: async (newTable) => {
      await createObject<ITableGet, ITablePrincipal>("api/table", newTable);
      mutate("api/table");
      closeDialog();
      handleOpen("La mesa se ha registrado correctamente");
      formik.resetForm();
    },
    validateOnChange: false,
  });

  return (
    <>
      <ButtonAdd text="Añadir Mesa" openDialog={openDialog} />

      <FormDialogPost
        Icon={TableBar}
        open={open}
        title="Añadir Mesa"
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
            <Grid item xs={12}>
              <TextField
                id="numSeats"
                type="text"
                label="Cantidad de Asientos:"
                error={Boolean(formik.errors.numSeats)}
                value={formik.values.numSeats}
                onChange={formik.handleChange}
                helperText={formik.errors.numSeats}
                disabled={formik.isSubmitting}
                fullWidth
              />
            </Grid>
          </Grid>
        </form>
      </FormDialogPost>
    </>
  );
};

export default TableAddForm;
