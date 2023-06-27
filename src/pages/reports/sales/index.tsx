import Layout from "@/components/Layout";
import ProtectedRouteForAuthenticated from "@/components/ProtectedRouteForAuthenticated";
import SalesReportSection from "@/sections/SalesReportSection";

const SalesReportPage = () => {
  return (
    <Layout>
      <SalesReportSection />
    </Layout>
  );
};

export default ProtectedRouteForAuthenticated({
  Component: SalesReportPage,
  roles: ["Administrador", "Gerente"],
});
