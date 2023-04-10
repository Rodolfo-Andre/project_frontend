import { ProtectedRouteForAuthenticated, Layout } from "@/components";
import { EmployeeSection } from "@/sections";

const EmployeesPage = () => {
  return (
    <Layout>
      <EmployeeSection />
    </Layout>
  );
};

export default ProtectedRouteForAuthenticated({ Component: EmployeesPage });
