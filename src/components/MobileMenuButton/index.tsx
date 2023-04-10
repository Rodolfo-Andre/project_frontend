import { IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { ContentBox, Menu } from "@/components";
import { useOpenClose } from "@/hooks";

const MobileMenuButton = () => {
  const [open, handleOpen, handleClose] = useOpenClose(false);

  return (
    <>
      <ContentBox sxProps={{ alignSelf: "center" }}>
        <IconButton
          sx={{
            borderRadius: 0,
            display: { xs: "block", md: "none" },
          }}
          onClick={handleOpen}
        >
          <MenuIcon sx={{ verticalAlign: "middle", fontSize: "2rem" }} />
        </IconButton>
      </ContentBox>

      <Menu
        sxProps={{ display: { xs: "block", md: "none" } }}
        drawerProps={{
          variant: "temporary",
          ModalProps: { keepMounted: true },
          open: open,
          onClose: handleClose,
        }}
      ></Menu>
    </>
  );
};

export default MobileMenuButton;
