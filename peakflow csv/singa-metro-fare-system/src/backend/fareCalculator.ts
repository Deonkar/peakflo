import { Journey } from "./types";
import { findFareRule, isPeakHour } from "./fareRules";

export class FareCalculator {
  private dailyJourneys: Journey[] = [];
  private weeklyJourneys: Journey[] = [];

  calculateFare(journey: Journey): number {
    const fareRule = findFareRule(journey.fromLine, journey.toLine);
    const fare = isPeakHour(journey.dateTime)
      ? fareRule.peakFare
      : fareRule.nonPeakFare;

    this.dailyJourneys.push(journey);
    this.weeklyJourneys.push(journey);

    return this.applyFareCaps(fare, fareRule);
  }

  private applyFareCaps(fare: number, fareRule: any): number {
    const dailyTotal = this.calculateDailyTotal();
    const weeklyTotal = this.calculateWeeklyTotal();

    if (dailyTotal > fareRule.dailyCap) return fareRule.dailyCap;
    if (weeklyTotal > fareRule.weeklyCap) return fareRule.weeklyCap;

    return fare;
  }

  private calculateDailyTotal(): number {
    const today = new Date();
    return this.dailyJourneys
      .filter((j) => j.dateTime.toDateString() === today.toDateString())
      .reduce((total, j) => total + this.calculateFare(j), 0);
  }

  private calculateWeeklyTotal(): number {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return this.weeklyJourneys
      .filter((j) => j.dateTime > oneWeekAgo)
      .reduce((total, j) => total + this.calculateFare(j), 0);
  }
}
