import { Box } from "@mui/material";
import { ReactNode } from "react";
import { Profile, MobileMenuButton } from "@/components";

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
        padding: "1rem 2rem",
        minHeight: "100vh",
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
