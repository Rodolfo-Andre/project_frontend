import { ProtectedRouteForAuthenticated, Layout } from "@/components";
import { CategoryDishSection } from "@/sections";

const CategoryDishPage = () => {
  return (
    <Layout>
      <CategoryDishSection />
    </Layout>
  );
};

export default ProtectedRouteForAuthenticated({ Component: CategoryDishPage });
