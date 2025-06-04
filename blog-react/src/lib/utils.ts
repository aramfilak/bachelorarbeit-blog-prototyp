import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatReadingTime = (time: number, unit: string) => {
  return `${time} ${unit}`;
};

export const formatGermanDate = (date: Date | undefined) => {
  if (!date) return "";

  if (typeof date === "string") {
    date = new Date(date);
  }

  return date.toLocaleDateString("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
