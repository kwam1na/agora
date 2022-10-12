import Layout from "@/components/layout";
import Settings from "@/components/settings";
import { Pages } from "@/constants";
import Head from "next/head";

const settings = () => {
  return (
    <Layout component={Pages.settings}>
      <Head>
        <title>{Pages.settings}</title>
      </Head>
      <Settings />;
    </Layout>
  );
};

export default settings;
