import { format, isToday } from "date-fns";

export const formatter = (currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });

export const getAppointmentDate = (date: Date, timeSlot: string) => {
  return `${format(date, "MMMM dd, yyyy")} at ${timeSlot}`;
};
