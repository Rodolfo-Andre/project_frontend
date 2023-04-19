import { ProtectedRouteForAuthenticated, Layout } from "@/components";
import { PayMethodSection } from "@/sections";

const PayMethodPage = () => {
  return (
    <Layout>
      <PayMethodSection />
    </Layout>
  );
};

export default ProtectedRouteForAuthenticated({ Component: PayMethodPage });
