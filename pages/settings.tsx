import Layout from "@/components/layout";
import Settings from "@/components/settings";
import { Pages } from "@/constants";

const settings = () => {
  return (
    <Layout component={Pages.settings}>
      <Settings />;
    </Layout>
  );
};

export default settings;
