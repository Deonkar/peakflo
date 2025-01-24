export interface Journey {
  fromLine: string;
  toLine: string;
  dateTime: Date;
}

export interface FareRule {
  fromLine: string;
  toLine: string;
  peakFare: number;
  nonPeakFare: number;
  dailyCap: number;
  weeklyCap: number;
}
