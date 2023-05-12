import Layout from "@/components/Layout";
import Welcome from "@/components/Welcome";
import ProtectedRouteForAuthenticated from "@/components/ProtectedRouteForAuthenticated";

const Home = () => {
  return (
    <Layout>
      <Welcome />
    </Layout>
  );
};

export default ProtectedRouteForAuthenticated({ Component: Home });
