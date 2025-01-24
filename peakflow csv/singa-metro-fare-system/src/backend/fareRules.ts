import { FareRule } from "./types";

export const FARE_RULES: FareRule[] = [
  {
    fromLine: "Green",
    toLine: "Green",
    peakFare: 2,
    nonPeakFare: 1,
    dailyCap: 8,
    weeklyCap: 55,
  },
  {
    fromLine: "Red",
    toLine: "Red",
    peakFare: 3,
    nonPeakFare: 2,
    dailyCap: 12,
    weeklyCap: 70,
  },
  {
    fromLine: "Green",
    toLine: "Red",
    peakFare: 4,
    nonPeakFare: 3,
    dailyCap: 15,
    weeklyCap: 90,
  },
  {
    fromLine: "Red",
    toLine: "Green",
    peakFare: 3,
    nonPeakFare: 2,
    dailyCap: 15,
    weeklyCap: 90,
  },
];

export function isPeakHour(dateTime: Date): boolean {
  const day = dateTime.getDay();
  const hour = dateTime.getHours();

  if (day >= 1 && day <= 5) {
    return (hour >= 8 && hour < 10) || (hour >= 16 && hour < 19);
  }
  if (day === 6) {
    return (hour >= 10 && hour < 14) || (hour >= 18 && hour < 23);
  }
  if (day === 0) {
    return hour >= 18 && hour < 23;
  }
  return false;
}

export function findFareRule(fromLine: string, toLine: string): FareRule {
  const rule = FARE_RULES.find(
    (r) => r.fromLine === fromLine && r.toLine === toLine
  );
  if (!rule) throw new Error("No fare rule found");
  return rule;
}
