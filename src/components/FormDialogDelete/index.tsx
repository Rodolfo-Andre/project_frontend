import DeleteForever from "@mui/icons-material/DeleteForever";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { IFormDialogProps } from "@/interfaces";

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
