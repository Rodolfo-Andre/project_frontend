import { Menu, Main } from "@/components";
import { ReactNode } from "react";
import { Box } from "@mui/material";
import Head from "next/head";

interface ILayoutProps {
  children: ReactNode;
}

function Layout({ children }: ILayoutProps) {
  return (
    <>
      <Head>
        <title>Mi Aplicación</title>
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
