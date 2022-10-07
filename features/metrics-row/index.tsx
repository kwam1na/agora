import { MetricCardProps } from "@/types";
import {
  IconArrowBack,
  IconCoin,
  IconCurrencyDollar,
  IconPackage,
  IconReportMoney,
  IconUsers,
} from "@tabler/icons";
import MetricCard from "../metric-card";
import styles from "./metricsrow.module.scss";

const MetricsRow = () => {
  const metrics: { [key: string]: MetricCardProps } = {
    sales: {
      headerText: "Total sales",
      value: "$2,500",
      icon: <IconCurrencyDollar color="#FFFFF0" />,
      direction: "negative",
      insights: {
        increase: "-20%",
        change: "+20.k",
      },
    },
    visitors: {
      headerText: "Visitors",
      value: "10,400",
      icon: <IconUsers color="#FFFFF0" />,
      direction: "positive",
      insights: {
        increase: "+28%",
        change: "+5.2k",
      },
    },
    orders: {
      headerText: "Total orders",
      value: "500",
      icon: <IconPackage color="#FFFFF0" />,
      direction: "positive",
      insights: {
        increase: "+1.5%",
        change: "13",
      },
    },
    refunds: {
      headerText: "Refunds",
      value: "10",
      icon: <IconArrowBack color="#FFFFF0" />,
      direction: "negative",
      insights: {
        increase: "+9.1%",
        change: "+20",
      },
    },
  };
  return (
    <div className={styles.container}>
      <MetricCard metric={metrics.sales} />
      <MetricCard metric={metrics.visitors} />
      <MetricCard metric={metrics.orders} />
      <MetricCard metric={metrics.refunds} noBorder />
    </div>
  );
};

export default MetricsRow;
