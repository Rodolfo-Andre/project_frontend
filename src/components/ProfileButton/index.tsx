import { Button, Typography, Avatar } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { MouseEvent } from "react";
import { ContentBox } from "@/components";
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
        <Avatar alt="avatar" src={user?.img ?? ''} />
        <Typography variant="subtitle2">
          {user?.firstName} {user?.lastName}
        </Typography>
      </Button>
    </ContentBox>
  );
};

export default ProfileButton;
