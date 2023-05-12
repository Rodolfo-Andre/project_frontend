import Layout from "@/components/Layout";
import AccountForm from "@/components/AccountForm";
import ProtectedRouteForAuthenticated from "@/components/ProtectedRouteForAuthenticated";

const AccountPage = () => {
  return (
    <Layout>
      <AccountForm />
    </Layout>
  );
};

export default ProtectedRouteForAuthenticated({ Component: AccountPage });
