import { SignInForm, ContentCenter } from "@/components";

const LoginPage = () => {
  return (
    <ContentCenter sxProps={{ minHeight: "100vh" }}>
      <SignInForm />
    </ContentCenter>
  );
};

export default LoginPage;
