import { Pages } from "@/constants";
import MetricsRow from "@/features/metrics-row";
import { User } from "@/types";
import { mockMetrics } from "@/utils/mock-data";
import { Group, Stack, Text, Title } from "@mantine/core";
import Layout from "../layout";
import styles from "./dashboard.module.scss";
import Head from "next/head";

export default function Dashboard({
  user,
  state,
}: {
  user?: User;
  state?: any;
}) {
  return (
    <Layout component={Pages.dashboard}>
      <Head>
        <title>{Pages.dashboard}</title>
      </Head>
      <div className={styles.main}>
        <Stack spacing={"xs"} justify="flex-start" style={{ width: "100%" }}>
          <Title order={1}> Welcome back, {user?.name} </Title>
          <Title order={5} color="dimmed" style={{ marginBottom: "24px" }}>
            Here&apos;s what&apos;s happening with your store today
          </Title>
          <Group>
            <MetricsRow metrics={mockMetrics} loading={false} />
          </Group>
        </Stack>
      </div>
    </Layout>
  );
}
