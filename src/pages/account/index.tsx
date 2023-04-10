import {
  Layout,
  AccountForm,
  ProtectedRouteForAuthenticated,
} from "@/components";

const AccountPage = () => {
  return (
    <Layout>
      <AccountForm />
    </Layout>
  );
};

export default ProtectedRouteForAuthenticated({ Component: AccountPage });
