import { IPayMethodGet, IPayMethodPrincipal } from "@/interfaces";
import { payMethodSchema } from "@/schemas";
import { Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { Payment } from "@mui/icons-material";
import { useSWRConfig } from "swr";
import { SetStateAction, useContext } from "react";
import { AlertContext } from "@/contexts/AlertSuccess";
import { FormDialogUpdate } from "@/components";
import { updateObject } from "@/services/HttpRequests";

interface ICategoryDishFormUpdateProps {
  payMethod: IPayMethodGet;
  open: boolean;
  closeDialog: () => void;
  setSelectedPayMethod: (value: SetStateAction<IPayMethodGet | null>) => void;
}

const PayMethodUpdateForm = ({
  payMethod,
  open,
  closeDialog,
  setSelectedPayMethod,
}: ICategoryDishFormUpdateProps) => {
  const { mutate } = useSWRConfig();
  const { handleOpen } = useContext(AlertContext);

  const formik = useFormik<IPayMethodPrincipal>({
    initialValues: {
      ...payMethod,
    },
    validationSchema: payMethodSchema,
    onSubmit: async (payMethodUpdate) => {
      await updateObject<IPayMethodGet, IPayMethodPrincipal>(
        `api/paymethod/${payMethod.id}`,
        payMethodUpdate
      );
      mutate("api/paymethod");
      closeDialog();
      handleOpen("La categoría se ha modificado correctamente");
      formik.resetForm();
      setSelectedPayMethod(null);
    },
    validateOnChange: false,
  });

  return (
    <>
      <FormDialogUpdate
        Icon={Payment}
        open={open}
        title="Actualizar Método de Pago"
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
      </FormDialogUpdate>
    </>
  );
};

export default PayMethodUpdateForm;
