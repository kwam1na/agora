import { Text } from "@mantine/core";
import Layout from "../layout";
import { Pages } from "@/constants";
import EmptyState from "@/features/empty-state";
import { IconPackage } from "@tabler/icons";
import Head from "next/head";

export default function Orders() {
  return (
    <Layout component={Pages.orders}>
      <Head>
        <title>{Pages.orders}</title>
      </Head>
      <EmptyState
        headerText="No orders just yet"
        body="Once your shop starts picking up steam, all your orders will appear here"
        illustration={<IconPackage size={"240px"} color={"gray"} />}
      />
    </Layout>
  );
}
