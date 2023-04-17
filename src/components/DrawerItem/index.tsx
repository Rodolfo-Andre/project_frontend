import { IMenuItemsProps, IMenuItemsWithSubItemsProps } from "@/interfaces";
import { Home, Build, People, FoodBank, Restaurant } from "@mui/icons-material";
import { Typography, List } from "@mui/material";
import { ListItemButtonLink, ListItemButtonWithCollapse } from "@/components";

const items: IMenuItemsProps[] = [
  {
    href: "/",
    text: "Inicio",
    Icon: Home,
  },
];

const itemsWithSubItems: IMenuItemsWithSubItemsProps[] = [
  {
    text: "Configuración",
    Icon: Build,
    section: "settings",
    items: [
      {
        href: "/settings/employee",
        text: "Empleados",
        Icon: People,
      },
      {
        href: "/settings/category-dish",
        text: "Categorías de Platos",
        Icon: FoodBank,
      },

      {
        href: "/settings/dish",
        text: "Platos",
        Icon: Restaurant,
      },
    ],
  },
];

const DrawerItem = () => {
  return (
    <>
      <Typography variant="h5" sx={{ my: 2, textAlign: "center" }}>
        Makako Burguer
      </Typography>

      <List>
        {items.map((item) => (
          <ListItemButtonLink key={item.text} {...item} />
        ))}
      </List>

      <List>
        {itemsWithSubItems.map((item) => (
          <ListItemButtonWithCollapse key={item.text} {...item} />
        ))}
      </List>
    </>
  );
};

export default DrawerItem;
