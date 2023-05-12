import ProtectedRouteForAuthenticated from "@/components/ProtectedRouteForAuthenticated";
import Layout from "@/components/Layout";
import DishSection from "@/sections/DishSection";

const DishPage = () => {
  return (
    <Layout>
      <DishSection />
    </Layout>
  );
};

export default ProtectedRouteForAuthenticated({
  Component: DishPage,
  roles: ["Administrador"],
});
