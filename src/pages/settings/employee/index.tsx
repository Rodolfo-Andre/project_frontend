import { ProtectedRouteForAuthenticated, Layout } from "@/components";
import { EmployeeSection } from "@/sections";

const EmployeePage = () => {
  return (
    <Layout>
      <EmployeeSection />
    </Layout>
  );
};

export default ProtectedRouteForAuthenticated({ Component: EmployeePage });
