import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BusinessHours } from "./types";
import { format } from "date-fns";
import { dayOfWeekMap } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isShopClosedOnDate = (date: Date, schedule: BusinessHours) => {
  const todayIndex = date.getDay();
  const closedDays = schedule
    .filter((day) => day.is_closed)
    .map((day) => dayOfWeekMap[day.day]);

  return closedDays.includes(todayIndex);
};

export const getDisabledDays = (schedule: BusinessHours) => {
  return schedule
    .filter((day) => day.is_closed)
    .map((day) => dayOfWeekMap[day.day]);
};
