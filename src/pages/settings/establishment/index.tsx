import { ProtectedRouteForAuthenticated, Layout } from "@/components";
import { EstablishmentSection } from "@/sections";

const EstablishmentPage = () => {
  return (
    <Layout>
      <EstablishmentSection />
    </Layout>
  );
};

export default ProtectedRouteForAuthenticated({ Component: EstablishmentPage });
