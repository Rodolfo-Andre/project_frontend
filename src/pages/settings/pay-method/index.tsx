import ProtectedRouteForAuthenticated from "@/components/ProtectedRouteForAuthenticated";
import Layout from "@/components/Layout";
import PayMethodSection from "@/sections/PayMethodSection";

const PayMethodPage = () => {
  return (
    <Layout>
      <PayMethodSection />
    </Layout>
  );
};

export default ProtectedRouteForAuthenticated({
  Component: PayMethodPage,
  roles: ["Administrador"],
});
