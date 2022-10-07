import MetricCard from "@/features/metric-card";
import MetricsRow from "@/features/metrics-row";
import { User } from "@/types";
import { Group, Stack, Text, Title } from "@mantine/core";
import styles from "./dashboard.module.scss";

export default function Dashboard({ user }: { user?: User }) {
  console.log("User in dash", user);
  return (
    <>
      <div className={styles.main}>
        <Stack spacing={"xs"} justify="flex-start" style={{ width: "100%" }}>
          <Title order={1}> Welcome back, {user?.name} </Title>
          <Title order={5} color="dimmed" style={{ marginBottom: "24px" }}>
            Here&apos;s what&apos;s happening with your store today
          </Title>
          <Group>
            <MetricsRow />
          </Group>
        </Stack>
      </div>
    </>
  );
}
