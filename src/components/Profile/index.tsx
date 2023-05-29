import ProfileButton from "@/components/ProfileButton";
import ProfileMenu from "@/components/ProfileMenu";
import { AuthContext } from "@/contexts/Auth";
import { useState, useContext, MouseEvent } from "react";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ProfileButton user={user!} handleOpen={handleOpen} anchorEl={anchorEl} />

      <ProfileMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        handleClose={handleClose}
        logout={logout}
      />
    </>
  );
};

export default Profile;
