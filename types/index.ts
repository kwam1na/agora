export type User = {
  name: string;
  email: string;
  imageSRC: string;
};

export type MetricCardProps = {
  icon: React.ReactElement;
  headerText: string;
  value: string;
  direction: "positive" | "negative";
  insights: {
    increase: string;
    change: string;
  };
};
