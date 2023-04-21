import { ProtectedRouteForAuthenticated, Layout } from "@/components";
import { CashSection } from "@/sections";

const CashPage = () => {
  return (
    <Layout>
      <CashSection />
    </Layout>
  );
};

export default ProtectedRouteForAuthenticated({ Component: CashPage });
