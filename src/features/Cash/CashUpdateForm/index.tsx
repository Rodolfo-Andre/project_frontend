import { ICashGet, ICashPrincipal, IEstablishmentGet } from "@/interfaces";
import { cashSchema } from "@/schemas";
import { Grid } from "@mui/material";
import { useFormik } from "formik";
import { PointOfSale } from "@mui/icons-material";
import { useSWRConfig } from "swr";
import { SetStateAction, useContext } from "react";
import { AlertContext } from "@/contexts/AlertSuccess";
import { ComboBox, FormDialogUpdate } from "@/components";
import { updateObject } from "@/services/HttpRequests";

interface ICashFormUpdateProps {
  cash: ICashGet;
  open: boolean;
  closeDialog: () => void;
  setSelectedCash: (value: SetStateAction<ICashGet | null>) => void;
}

const CashUpdateForm = ({
  cash,
  open,
  closeDialog,
  setSelectedCash,
}: ICashFormUpdateProps) => {
  const { mutate } = useSWRConfig();
  const { handleOpen } = useContext(AlertContext);

  const formik = useFormik<ICashPrincipal>({
    initialValues: {
      establishmentId: cash.establishment.id,
    },
    validationSchema: cashSchema,
    onSubmit: async (cashUpdate) => {
      await updateObject<ICashGet, ICashPrincipal>(
        `api/cash/${cash.id}`,
        cashUpdate
      );
      mutate("api/cash");
      closeDialog();
      handleOpen("La caja se ha modificado correctamente");
      formik.resetForm();
      setSelectedCash(null);
    },
    validateOnChange: false,
  });

  return (
    <>
      <FormDialogUpdate
        Icon={PointOfSale}
        open={open}
        title="Actualizar Caja"
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
              <ComboBox
                id="id"
                label="name"
                url="api/establishment"
                value={formik.values.establishmentId}
                handleChange={(establishment: IEstablishmentGet | null) => {
                  formik.setFieldValue("establishmentId", establishment?.id);
                }}
                textFieldProps={{
                  label: "Establecimiento",
                  error: Boolean(formik.errors.establishmentId),
                  helperText: formik.errors.establishmentId,
                  disabled: formik.isSubmitting,
                }}
              />
            </Grid>
          </Grid>
        </form>
      </FormDialogUpdate>
    </>
  );
};

export default CashUpdateForm;
