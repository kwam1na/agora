import { Loader, Text } from "@mantine/core";
import Layout from "../layout";
import { Pages } from "@/constants";
import EmptyState from "@/features/empty-state";
import { IconUsers } from "@tabler/icons";

export default function Users() {
  return (
    <Layout component={Pages.users}>
      <EmptyState
        illustration={<IconUsers size={"240px"} />}
        headerText={"Everything about your users, in one place"}
        body={"Your users will appear here once they have been added"}
      />
    </Layout>
  );
}
