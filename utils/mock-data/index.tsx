import { User, MetricCardProps } from "@/types";
import {
  IconArrowBack,
  IconCurrencyDollar,
  IconPackage,
  IconUsers,
} from "@tabler/icons";

export const mockUser: User = {
  name: "Jon",
  email: "lordsnow@thenorth.com",
  imageSRC: "/jon-snow.webp",
};

export const mockMetrics: { [key: string]: MetricCardProps } = {
  sales: {
    headerText: "Total sales",
    value: "$2,500",
    icon: <IconCurrencyDollar color="#FFFFF0" />,
    direction: "negative",
    insights: {
      increase: "-20%",
      change: "+100",
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
      change: "+13",
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
