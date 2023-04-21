import { ProtectedRouteForAuthenticated, Layout } from "@/components";
import { TableSection } from "@/sections";

const TablePage = () => {
  return (
    <Layout>
      <TableSection />
    </Layout>
  );
};

export default ProtectedRouteForAuthenticated({ Component: TablePage });
