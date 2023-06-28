import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import ContentBox from "@/components/ContentBox";
import { useContext, MouseEvent } from "react";
import { AuthContext } from "@/contexts/Auth";
import Tooltip from "@mui/material/Tooltip";

interface IProfileButtonProps {
  handleOpen: (event: MouseEvent<HTMLButtonElement>) => void;
  anchorEl: HTMLElement | null;
}

const MAX_LENGTH = 14;

const ProfileButton = ({ handleOpen, anchorEl }: IProfileButtonProps) => {
  const { user } = useContext(AuthContext);
  const fullName = `${user?.firstName} ${user?.lastName}`;

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
        <Avatar alt="avatar" src={user?.img ?? ""} />
        <Tooltip title={fullName}>
          <Typography variant="subtitle2">
            {fullName.length <= MAX_LENGTH
              ? fullName
              : `${fullName.slice(0, MAX_LENGTH)}...`}
          </Typography>
        </Tooltip>
      </Button>
    </ContentBox>
  );
};

export default ProfileButton;
