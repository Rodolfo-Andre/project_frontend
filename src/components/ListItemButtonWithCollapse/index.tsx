import { IMenuItemsWithSubItemsProps } from "@/interfaces";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useToggle } from "@/hooks";
import { ListItemButtonLink } from "@/components";
import Router from "next/router";

const ListItemButtonWithCollapse = ({
  text,
  Icon,
  section,
  items,
}: IMenuItemsWithSubItemsProps) => {
  const [open, toogle] = useToggle(false);

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          onClick={toogle}
          sx={{
            "&.Mui-selected": {
              color: "#0D6EFD",
            },
            "&.Mui-selected .MuiTypography-root": {
              fontWeight: "bolder",
            },
          }}
          selected={Router.asPath.includes(section)}
        >
          <ListItemIcon sx={{ color: "inherit" }}>
            <Icon sx={{ color: "inherit", fontSize: "2rem" }} />
          </ListItemIcon>

          <ListItemText primary={text} />

          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        {items.map((item) => (
          <ListItemButtonLink key={item.text} {...item} />
        ))}
      </Collapse>
    </>
  );
};

export default ListItemButtonWithCollapse;
