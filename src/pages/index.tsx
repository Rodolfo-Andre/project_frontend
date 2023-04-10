import { Layout, Welcome, ProtectedRouteForAuthenticated } from "@/components";

const Home = () => {
  return (
    <Layout>
      <Welcome />
    </Layout>
  );
};

export default ProtectedRouteForAuthenticated({ Component: Home });
