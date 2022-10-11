import MetricCard from "../metric-card";
import styles from "./metricsrow.module.scss";
import { MetricCardProps } from "@/types";

const MetricsRow = ({
  metrics,
  loading,
}: {
  metrics?: { [key in string]: MetricCardProps };
  loading: boolean;
}) => {
  return (
    <div className={styles.container}>
      <MetricCard metric={metrics?.sales} loading={loading} />
      <MetricCard metric={metrics?.visitors} loading={loading} />
      <MetricCard metric={metrics?.orders} loading={loading} />
      <MetricCard metric={metrics?.refunds} loading={loading} noBorder />
    </div>
  );
};

export default MetricsRow;
