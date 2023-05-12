import Main from "@/components/Main";
import Menu from "@/components/Menu";
import Box from "@mui/material/Box";
import Head from "next/head";
import { ReactNode } from "react";

interface ILayoutProps {
  children: ReactNode;
}

function Layout({ children }: ILayoutProps) {
  return (
    <>
      <Head>
        <title>Sistema de Comandas</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Box sx={{ display: "flex" }}>
        <Menu
          sxProps={{
            "& .MuiPaper-root": {
              borderRightStyle: "dashed",
            },
            display: { xs: "none", md: "block" },
          }}
          drawerProps={{ variant: "permanent", anchor: "left" }}
        ></Menu>

        <Main>{children}</Main>
      </Box>
    </>
  );
}

export default Layout;
