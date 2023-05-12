import ProtectedRouteForAuthenticated from "@/components/ProtectedRouteForAuthenticated";
import Layout from "@/components/Layout";
import EmployeeSection from "@/sections/EmployeeSection";

const EmployeePage = () => {
  return (
    <Layout>
      <EmployeeSection />
    </Layout>
  );
};

export default ProtectedRouteForAuthenticated({
  Component: EmployeePage,
  roles: ["Administrador"],
});
