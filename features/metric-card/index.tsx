import RoundedIcon from "@/components/rounded-icon";
import { MetricCardProps } from "@/types";
import { Text, Title } from "@mantine/core";
import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconReportMoney,
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons";
import styles from "./metriccard.module.scss";

const MetricCard = ({
  metric,
  noBorder,
}: {
  metric: MetricCardProps;
  noBorder?: boolean;
}) => {
  return (
    <div className={noBorder ? styles.containerNoBorder : styles.container}>
      <div className={styles.header}>
        <div>
          <RoundedIcon width={32} icon={metric.icon} />
        </div>
        <Text>{metric.headerText}</Text>
      </div>
      <div className={styles.value}>
        <Title order={3}>{metric.value}</Title>
      </div>
      <div className={styles.insights}>
        <div className={styles.insightsTrend}>
          {metric.direction === "positive" ? (
            <IconArrowUpRight color="limegreen" />
          ) : (
            <IconArrowDownRight color="crimson" />
          )}
          <Text
            color={metric.direction == "positive" ? "limegreen" : "crimson"}
          >
            {metric.insights.increase}
          </Text>
        </div>
        <Text>{metric.insights.change} this week</Text>
      </div>
    </div>
  );
};

export default MetricCard;
