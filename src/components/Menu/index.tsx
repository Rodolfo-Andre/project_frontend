import DrawerItem from "@/components/DrawerItem";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import { SxProps } from "@mui/material/styles";

interface IMenuProps {
  drawerProps?: DrawerProps;
  sxProps?: SxProps;
}

const Menu = ({ drawerProps, sxProps }: IMenuProps) => {
  return (
    <Drawer
      sx={{
        ...sxProps,
        width: 260,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 260,
          boxSizing: "border-box",
        },
        "& .MuiDrawer-paper > .MuiList-root": {
          padding: "0 1rem",
        },
        "& .MuiListItem-root": {
          color: "#637381",
          marginBottom: "0.25rem",
        },
        "& .MuiListItemButton-root": {
          borderRadius: "0.5rem",
        },
      }}
      {...drawerProps}
    >
      <DrawerItem />
    </Drawer>
  );
};

export default Menu;
