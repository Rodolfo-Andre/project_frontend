import { SignInForm, ContentCenter } from "@/components";
import { Box } from "@mui/material";

const LoginPage = () => {
  return (
    <Box
      sx={{
        backgroundImage: "url('background.png')",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundBlendMode: "color",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ContentCenter sxProps={{ minHeight: "100vh" }}>
        <SignInForm />
      </ContentCenter>
    </Box>
  );
};

export default LoginPage;
