import DrawerItem from "@/components/DrawerItem";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import { SxProps } from "@mui/material/styles";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

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
        "& .MuiList-root": {
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
      <SimpleBar style={{ height: "100%" }}>
        <DrawerItem />
      </SimpleBar>
    </Drawer>
  );
};

export default Menu;
