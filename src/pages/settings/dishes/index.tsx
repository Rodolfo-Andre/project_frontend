import { ProtectedRouteForAuthenticated, Layout } from "@/components";

const DishesPages = () => {
  return (
    <Layout>
      <h2>Configuración de Platos</h2>
    </Layout>
  );
};

export default ProtectedRouteForAuthenticated({ Component: DishesPages });
