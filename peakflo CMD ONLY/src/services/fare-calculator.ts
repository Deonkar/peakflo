import { Journey } from "../models/journey";
import { FARE_RULES, FareRule } from "../models/fare-rules";

export class FareCalculator {
  static isPeakHour(dateTime: Date): boolean {
    const day = dateTime.getDay();
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();

    if (day >= 1 && day <= 5) {
      // Monday to Friday
      return (
        (hours === 8 && minutes >= 0) ||
        (hours === 9 && minutes <= 59) ||
        (hours === 16 && minutes >= 30) ||
        hours === 17 ||
        (hours === 18 && minutes <= 59)
      );
    }

    if (day === 6) {
      // Saturday
      return (
        (hours === 10 && minutes >= 0) ||
        (hours >= 11 && hours < 14) ||
        (hours === 18 && minutes >= 0) ||
        (hours >= 19 && hours < 23)
      );
    }

    if (day === 0) {
      // Sunday
      return (hours === 18 && minutes >= 0) || (hours >= 19 && hours < 23);
    }

    return false;
  }

  static calculateFare(journey: Journey): number {
    const fareRule = FARE_RULES.find(
      (rule) =>
        rule.fromLine === journey.fromLine && rule.toLine === journey.toLine
    );

    if (!fareRule) {
      throw new Error(
        `No fare rule found for journey from ${journey.fromLine} to ${journey.toLine}`
      );
    }

    return this.isPeakHour(journey.dateTime)
      ? fareRule.peakFare
      : fareRule.nonPeakFare;
  }

  static calculateTotalFare(journeys: Journey[]): {
    totalFare: number;
    dailyCaps: { [key: string]: number };
  } {
    const dailyFares: { [key: string]: number } = {};
    const dailyCaps: { [key: string]: number } = {};

    let totalFare = 0;
    journeys.forEach((journey) => {
      const fareRule = FARE_RULES.find(
        (rule) =>
          rule.fromLine === journey.fromLine && rule.toLine === journey.toLine
      );

      if (!fareRule) return;

      const journeyFare = this.calculateFare(journey);
      const journeyKey = `${journey.fromLine}-${journey.toLine}`;
      const journeyDate = journey.dateTime.toISOString().split("T")[0];

      dailyFares[journeyDate] = (dailyFares[journeyDate] || 0) + journeyFare;
      dailyCaps[journeyKey] = fareRule.dailyCap;

      // Apply daily cap
      if (dailyFares[journeyDate] > fareRule.dailyCap) {
        totalFare += Math.max(
          0,
          fareRule.dailyCap - (dailyFares[journeyDate] - journeyFare)
        );
      } else {
        totalFare += journeyFare;
      }
    });

    return { totalFare, dailyCaps };
  }
}
