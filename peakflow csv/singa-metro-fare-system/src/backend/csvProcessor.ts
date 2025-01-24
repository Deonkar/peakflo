// src/backend/csvProcessor.ts
import Papa from "papaparse";
import { Journey } from "./types";
import { FareCalculator } from "./fareCalculator";

export function processCSV(
  file: File
): Promise<{ totalFare: number; journeys: Journey[] }> {
  return new Promise((resolve, reject) => {
    const calculator = new FareCalculator();

    Papa.parse(file, {
      complete: (results) => {
        try {
          // Filter out empty rows and invalid data
          const validRows = results.data.filter(
            (row) =>
              Array.isArray(row) &&
              row.length === 3 &&
              row.every((cell) => cell !== "")
          );

          if (validRows.length === 0) {
            throw new Error("No valid rows found in the CSV file");
          }

          const journeys: Journey[] = validRows.map((row: string[]) => {
            // Validate input data
            if (
              typeof row[0] !== "string" ||
              typeof row[1] !== "string" ||
              typeof row[2] !== "string"
            ) {
              throw new Error("Invalid data type in CSV row");
            }

            const dateTime = new Date(row[2]);
            if (isNaN(dateTime.getTime())) {
              throw new Error(`Invalid date: ${row[2]}`);
            }

            return {
              fromLine: row[0].trim(),
              toLine: row[1].trim(),
              dateTime: dateTime,
            };
          });

          const totalFare = journeys.reduce(
            (total, journey) => total + calculator.calculateFare(journey),
            0
          );

          resolve({ totalFare, journeys });
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => reject(error),
    });
  });
}
