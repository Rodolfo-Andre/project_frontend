import SignInForm from "@/components/SignInForm";
import ContentCenter from "@/components/ContentCenter";
import Box from "@mui/material/Box";

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
      <ContentCenter sxProps={{ minHeight: "100svh" }}>
        <SignInForm />
      </ContentCenter>
    </Box>
  );
};

export default LoginPage;
