import Dangerous from "@mui/icons-material/Dangerous";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface IDialogErrorProps {
  title: string;
  description: string;
  open: boolean;
  closeDialog: () => void;
}

const DialogError = ({
  title,
  description,
  open,
  closeDialog,
}: IDialogErrorProps) => {
  return (
    <Dialog open={open}>
      <DialogTitle sx={{ textAlign: "center" }}>
        <Dangerous
          sx={{ display: "block", margin: "auto", fontSize: "5rem" }}
          color="error"
        />
        {title}
      </DialogTitle>

      <DialogContent sx={{ textAlign: "justify" }}>{description}</DialogContent>

      <DialogActions>
        <Button
          sx={{ flexGrow: 1 }}
          variant="contained"
          color="error"
          size="large"
          onClick={closeDialog}
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogError;
