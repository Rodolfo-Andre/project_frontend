import AddCircle from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";

interface IButtonAddProps {
  text: string;
  openDialog: () => void;
}

const ButtonAdd = ({ text, openDialog }: IButtonAddProps) => {
  return (
    <Button variant="contained" onClick={openDialog} startIcon={<AddCircle />}>
      {text}
    </Button>
  );
};

export default ButtonAdd;
