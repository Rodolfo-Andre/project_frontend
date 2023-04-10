import { IFormDialogProps } from "@/interfaces";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  SvgIconProps,
} from "@mui/material";
import { ComponentType, ReactNode } from "react";

interface IFormDialgoPostProps extends IFormDialogProps {
  Icon: ComponentType<SvgIconProps>;
  children: ReactNode;
}

const FormDialogPost = ({
  open,
  handleCancel,
  handleSuccess,
  Icon,
  children,
  title,
}: IFormDialgoPostProps) => {
  return (
    <Dialog open={open}>
      <DialogTitle sx={{ textAlign: "center" }}>
        <Icon
          sx={{ display: "block", margin: "auto", fontSize: "5rem" }}
          color="primary"
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
        >
          Cancelar
        </Button>
        <Button
          sx={{ flexGrow: 1 }}
          variant="contained"
          size="large"
          onClick={handleSuccess}
        >
          Añadir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialogPost;
