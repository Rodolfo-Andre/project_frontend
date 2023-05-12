import ProtectedRouteForAuthenticated from "@/components/ProtectedRouteForAuthenticated";
import Layout from "@/components/Layout";
import TableSection from "@/sections/TableSection";

const TablePage = () => {
  return (
    <Layout>
      <TableSection />
    </Layout>
  );
};

export default ProtectedRouteForAuthenticated({
  Component: TablePage,
  roles: ["Administrador"],
});
