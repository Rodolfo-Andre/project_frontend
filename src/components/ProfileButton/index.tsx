import { Button, Typography, Avatar } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { IEmployeeGet } from "@/interfaces/IEmployee";
import { MouseEvent } from "react";
import { ContentBox } from "@/components";
import { url } from "gravatar";

interface IProfileButtonProps {
  user: IEmployeeGet;
  handleOpen: (event: MouseEvent<HTMLButtonElement>) => void;
  anchorEl: HTMLElement | null;
}

const ProfileButton = ({ user, handleOpen, anchorEl }: IProfileButtonProps) => {
  const avatar_url = url(user.user.email, { d: "identicon" }, true);

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
        <Avatar alt="avatar" src={avatar_url} />
        <Typography variant="subtitle2">
          {user?.firstName} {user?.lastName}
        </Typography>
      </Button>
    </ContentBox>
  );
};

export default ProfileButton;
