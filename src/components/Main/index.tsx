import Box from "@mui/material/Box";
import Profile from "@/components/Profile";
import MobileMenuButton from "@/components/MobileMenuButton";
import { ReactNode } from "react";

interface IMainProps {
  children: ReactNode;
}

const Main = ({ children }: IMainProps) => {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        gap: 2,
        backgroundColor: "#F2F5F8",
        padding: "1rem",
        minHeight: "100svh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "space-between", md: "end" },
        }}
      >
        <MobileMenuButton />
        <Profile />
      </Box>

      {children}
    </Box>
  );
};

export default Main;
