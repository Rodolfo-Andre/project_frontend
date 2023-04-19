import { ButtonAdd, FormDialogPost } from "@/components";
import { useOpenClose } from "@/hooks";
import { Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { AddCard } from "@mui/icons-material";
import { useSWRConfig } from "swr";
import { useContext } from "react";
import { AlertContext } from "@/contexts/AlertSuccess";
import { createObject } from "@/services/HttpRequests";
import { payMethodSchema } from "@/schemas";
import { IPayMethodGet, IPayMethodPrincipal } from "@/interfaces";

const initialValues: IPayMethodPrincipal = {
  paymethod: "",
};

const PayMethodAddForm = () => {
  const { mutate } = useSWRConfig();
  const { handleOpen } = useContext(AlertContext);
  const [open, openDialog, closeDialog] = useOpenClose(false);

  const formik = useFormik<IPayMethodPrincipal>({
    initialValues,
    validationSchema: payMethodSchema,
    onSubmit: async (newPayMethod) => {
      await createObject<IPayMethodGet, IPayMethodPrincipal>(
        "api/paymethod",
        newPayMethod
      );
      mutate("api/paymethod");
      closeDialog();
      handleOpen("El método de pago se ha registrado correctamente");
      formik.resetForm();
    },
    validateOnChange: false,
  });

  return (
    <>
      <ButtonAdd text="Añadir Método de Pago" openDialog={openDialog} />

      <FormDialogPost
        Icon={AddCard}
        open={open}
        title="Añadir Método de Pago"
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
            <Grid item xs={12}>
              <TextField
                id="paymethod"
                type="text"
                label="Método de Pago"
                error={Boolean(formik.errors.paymethod)}
                value={formik.values.paymethod}
                onChange={formik.handleChange}
                helperText={formik.errors.paymethod}
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

export default PayMethodAddForm;
