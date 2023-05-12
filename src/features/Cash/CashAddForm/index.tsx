import ButtonAdd from "@/components/ButtonAdd";
import ComboBox from "@/components/ComboBox";
import FormDialogPost from "@/components/FormDialogPost";
import Grid from "@mui/material/Grid";
import PointOfSale from "@mui/icons-material/PointOfSale";
import useSWR, { useSWRConfig } from "swr";
import { useOpenClose } from "@/hooks";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { AlertContext } from "@/contexts/AlertSuccess";
import { createObject, getObject } from "@/services/HttpRequests";
import { IEstablishmentGet, ICashPrincipal, ICashGet } from "@/interfaces";
import { cashSchema } from "@/schemas";

const CashAddForm = () => {
  const { data: establishment } = useSWR("api/establishment/first", () =>
    getObject<IEstablishmentGet>("api/establishment/first")
  );
  const { mutate } = useSWRConfig();
  const { handleOpen } = useContext(AlertContext);
  const [open, openDialog, closeDialog] = useOpenClose(false);

  const formik = useFormik<ICashPrincipal>({
    initialValues: {},
    validationSchema: cashSchema,
    onSubmit: async (newCash) => {
      await createObject<ICashGet, ICashPrincipal>("api/cash", newCash);
      mutate("api/cash");
      closeDialog();
      handleOpen("La caja se ha registrado correctamente");
      formik.resetForm();
    },
    validateOnChange: false,
  });

  useEffect(() => {
    if (establishment) {
      formik.setFieldValue("establishmentId", establishment?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [establishment]);

  return (
    <>
      <ButtonAdd text="Añadir Caja" openDialog={openDialog} />

      <FormDialogPost
        Icon={PointOfSale}
        open={open}
        title="Añadir Caja"
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
                value={establishment?.id}
                handleChange={(establishment: IEstablishmentGet | null) => {
                  formik.setFieldValue("establishmentId", establishment?.id);
                }}
                disabled={true}
                textFieldProps={{
                  label: "Establecimiento",
                  error: Boolean(formik.errors.establishmentId),
                  helperText: formik.errors.establishmentId,
                }}
              />
            </Grid>
          </Grid>
        </form>
      </FormDialogPost>
    </>
  );
};

export default CashAddForm;
