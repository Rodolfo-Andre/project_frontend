import Home from "@mui/icons-material/Home";
import Build from "@mui/icons-material/Build";
import People from "@mui/icons-material/People";
import FoodBank from "@mui/icons-material/FoodBank";
import Restaurant from "@mui/icons-material/Restaurant";
import Payments from "@mui/icons-material/Payments";
import TableRestaurant from "@mui/icons-material/TableRestaurant";
import Storefront from "@mui/icons-material/Storefront";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PointOfSale from "@mui/icons-material/PointOfSale";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItemButtonLink from "@/components/ListItemButtonLink";
import useSWR from "swr";
import ListItemButtonWithCollapse from "@/components/ListItemButtonWithCollapse";
import UserRoles from "@/interfaces/UserRoles";
import IMenuItemsWithSubItemsProps from "@/interfaces/IMenuItemsWithSubItemsProps";
import { IEstablishmentGet } from "@/interfaces/IEstablishment";
import { useContext } from "react";
import { AuthContext } from "@/contexts/Auth";
import { getObject } from "@/services/HttpRequests";

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
      {
        href: "/settings/pay-method",
        text: "Métodos de Pagos",
        Icon: Payments,
      },
      {
        href: "/settings/table",
        text: "Mesas",
        Icon: TableRestaurant,
      },
      {
        href: "/settings/establishment",
        text: "Establecimiento",
        Icon: Storefront,
      },
      {
        href: "/settings/cash",
        text: "Cajas",
        Icon: PointOfSale,
      },
    ],
  },
];

const DrawerItem = () => {
  const { user } = useContext(AuthContext);
  const { data } = useSWR("api/establishment/first", () =>
    getObject<IEstablishmentGet>("api/establishment/first")
  );

  return (
    <>
      <Typography variant="h5" sx={{ my: 2, textAlign: "center" }}>
        {data?.name}
      </Typography>

      <List>
        <ListItemButtonLink Icon={Home} text="Inicio" href="/" />
      </List>

      <List>
        <ListItemButtonLink
          Icon={ReceiptLongIcon}
          text="Generar Comandas"
          href="/commands"
        />
      </List>

      <List>
        <ListItemButtonLink
          Icon={AccountBalanceWalletIcon}
          text="Caja Registradora"
          href="/vouchers"
        />
      </List>

      {user?.role.roleName === ("Administrador" as UserRoles) && (
        <List>
          {itemsWithSubItems.map((item) => (
            <ListItemButtonWithCollapse key={item.text} {...item} />
          ))}
        </List>
      )}
    </>
  );
};

export default DrawerItem;
