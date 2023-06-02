import Layout from "@/components/Layout";
import ProtectedRouteForAuthenticated from "@/components/ProtectedRouteForAuthenticated";
import { VoucherReportSection } from "@/sections";

const VoucherReportPage = () => {
  return (
    <Layout>
      <VoucherReportSection />
    </Layout>
  );
};

export default ProtectedRouteForAuthenticated({
  Component: VoucherReportPage,
  roles: ["Administrador"],
});
