import ProtectedRouteForAuthenticated from "@/components/ProtectedRouteForAuthenticated";
import Layout from "@/components/Layout";
import EstablishmentSection from "@/sections/EstablishmentSection";

const EstablishmentPage = () => {
  return (
    <Layout>
      <EstablishmentSection />
    </Layout>
  );
};

export default ProtectedRouteForAuthenticated({
  Component: EstablishmentPage,
  roles: ["Administrador"],
});
