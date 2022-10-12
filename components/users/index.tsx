import { Loader, Text } from "@mantine/core";
import Layout from "../layout";
import { Pages } from "@/constants";
import EmptyState from "@/features/empty-state";
import { IconUsers } from "@tabler/icons";
import Head from "next/head";

export default function Users() {
  return (
    <Layout component={Pages.users}>
      <Head>
        <title>{Pages.users}</title>
      </Head>
      <EmptyState
        illustration={<IconUsers size={"240px"} color={"gray"} />}
        headerText={"Everything about your users, in one place"}
        body={"Your users will appear here once they have been added"}
      />
    </Layout>
  );
}
