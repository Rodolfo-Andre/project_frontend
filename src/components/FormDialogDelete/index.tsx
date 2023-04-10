import { IFormDialogProps } from "@/interfaces";
import { DeleteForever } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface IFormDialogDeleteProps extends IFormDialogProps {
  description?: string;
}

const FormDialogDelete = ({
  title,
  description,
  open,
  handleCancel,
  handleSuccess,
}: IFormDialogDeleteProps) => {
  return (
    <Dialog open={open}>
      <DialogTitle sx={{ textAlign: "center" }}>
        <DeleteForever
          sx={{ display: "block", margin: "auto", fontSize: "5rem" }}
          color="error"
        />
        {title}
      </DialogTitle>

      {description && <DialogContent>{description}</DialogContent>}

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
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialogDelete;
