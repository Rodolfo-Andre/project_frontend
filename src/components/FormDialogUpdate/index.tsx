import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { IFormDialogProps } from "@/interfaces";
import { ComponentType, ReactNode } from "react";

interface IFormDialgoPostProps extends IFormDialogProps {
  Icon: ComponentType<SvgIconProps>;
  children: ReactNode;
}

const FormDialogUpdate = ({
  open,
  handleCancel,
  handleSuccess,
  isSubmitting,
  Icon,
  children,
  title,
}: IFormDialgoPostProps) => {
  return (
    <Dialog open={open}>
      <DialogTitle sx={{ textAlign: "center" }}>
        <Icon
          sx={{ display: "block", margin: "auto", fontSize: "5rem" }}
          color="warning"
        />
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          sx={{ flexGrow: 1 }}
          variant="contained"
          color="error"
          size="large"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button
          sx={{ flexGrow: 1 }}
          variant="contained"
          color="warning"
          size="large"
          onClick={handleSuccess}
          disabled={isSubmitting}
        >
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialogUpdate;
