export interface FareRule {
  fromLine: string;
  toLine: string;
  peakFare: number;
  nonPeakFare: number;
  dailyCap: number;
  weeklyCap: number;
}

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
