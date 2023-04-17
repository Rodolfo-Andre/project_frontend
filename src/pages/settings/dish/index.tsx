import { ProtectedRouteForAuthenticated, Layout } from "@/components";
import DishSection from "@/sections/DishSection";

const DishPage = () => {
  return (
    <Layout>
      <DishSection />
    </Layout>
  );
};

export default ProtectedRouteForAuthenticated({ Component: DishPage });
