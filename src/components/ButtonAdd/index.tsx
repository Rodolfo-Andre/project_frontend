import { AddCircle } from "@mui/icons-material";
import { Button } from "@mui/material";

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
