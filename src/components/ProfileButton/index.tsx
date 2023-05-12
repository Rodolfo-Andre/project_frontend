import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import ContentBox from "@/components/ContentBox";
import { MouseEvent } from "react";
import { ICurrentUser } from "@/interfaces";

interface IProfileButtonProps {
  user: ICurrentUser;
  handleOpen: (event: MouseEvent<HTMLButtonElement>) => void;
  anchorEl: HTMLElement | null;
}

const ProfileButton = ({ user, handleOpen, anchorEl }: IProfileButtonProps) => {
  return (
    <ContentBox>
      <Button
        sx={{
          gap: 1.5,
          display: "flex",
        }}
        color="inherit"
        variant="text"
        endIcon={anchorEl ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        onClick={handleOpen}
      >
        <Avatar alt="avatar" src={user.img} />
        <Typography variant="subtitle2">
          {user?.firstName} {user?.lastName}
        </Typography>
      </Button>
    </ContentBox>
  );
};

export default ProfileButton;
