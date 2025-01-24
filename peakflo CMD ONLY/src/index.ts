import { CSVParser } from "./services/csv-parser";
import { FareCalculator } from "./services/fare-calculator";

async function main() {
  try {
    const journeys = await CSVParser.parseJourneys("input.csv");
    const { totalFare, dailyCaps } =
      FareCalculator.calculateTotalFare(journeys);

    console.log("Total Fare:", totalFare);
    console.log("Daily Caps:", dailyCaps);
  } catch (error) {
    console.error("Error processing journeys:", error);
  }
}

main();
