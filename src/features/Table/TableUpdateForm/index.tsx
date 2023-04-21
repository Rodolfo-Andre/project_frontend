import { ITableGet, ITableUpdate } from "@/interfaces";
import { Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { TableBar } from "@mui/icons-material";
import { useSWRConfig } from "swr";
import { SetStateAction, useContext } from "react";
import { AlertContext } from "@/contexts/AlertSuccess";
import { FormDialogUpdate } from "@/components";
import { updateObject } from "@/services/HttpRequests";
import { TypeTableState } from "@/enum";
import { tableUpdateSchema } from "@/schemas";

interface ITableFormUpdateProps {
  table: ITableGet;
  open: boolean;
  closeDialog: () => void;
  setSelectedTable: (value: SetStateAction<ITableGet | null>) => void;
}

const TableUpdateForm = ({
  table,
  open,
  closeDialog,
  setSelectedTable,
}: ITableFormUpdateProps) => {
  const { mutate } = useSWRConfig();
  const { handleOpen } = useContext(AlertContext);

  const formik = useFormik<ITableUpdate>({
    initialValues: {
      numSeats: table.numSeats,
      stateTable: Object.values(TypeTableState).find(
        (v) => v === table.stateTable
      )!,
    },
    validationSchema: tableUpdateSchema,
    onSubmit: async (tableUpdate) => {
      await updateObject<ITableGet, ITableUpdate>(
        `api/table/${table.numTable}`,
        tableUpdate
      );
      mutate("api/table");
      closeDialog();
      handleOpen("La mesa se ha modificado correctamente");
      formik.resetForm();
      setSelectedTable(null);
    },
    validateOnChange: false,
  });

  return (
    <>
      <FormDialogUpdate
        Icon={TableBar}
        open={open}
        title="Actualizar Mesa"
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
                label="Cantidad de Asientos"
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
      </FormDialogUpdate>
    </>
  );
};

export default TableUpdateForm;
