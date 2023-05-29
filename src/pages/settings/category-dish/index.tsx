import ProtectedRouteForAuthenticated from "@/components/ProtectedRouteForAuthenticated";
import Layout from "@/components/Layout";
import CategoryDishSection from "@/sections/CategoryDishSection";

const CategoryDishPage = () => {
  return (
    <Layout>
      <CategoryDishSection />
    </Layout>
  );
};

export default ProtectedRouteForAuthenticated({
  Component: CategoryDishPage,
  roles: ["Administrador"],
});
