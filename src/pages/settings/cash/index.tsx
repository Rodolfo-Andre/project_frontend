import ProtectedRouteForAuthenticated from "@/components/ProtectedRouteForAuthenticated";
import Layout from "@/components/Layout";
import CashSection from "@/sections/CashSection";

const CashPage = () => {
  return (
    <Layout>
      <CashSection />
    </Layout>
  );
};

export default ProtectedRouteForAuthenticated({
  Component: CashPage,
  roles: ["Administrador"],
});
