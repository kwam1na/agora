export const ATHENA_URL = "https://athena-1.vercel.app";
// export const ATHENA_URL = "http://localhost:8080";

export const containerVariants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "easeIn",
      duration: 0.4,
    },
  },
};

export const dayOfWeekMap: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};
