import * as fs from "fs";
import * as csv from "csv-parse";
import { Journey } from "../models/journey";

export class CSVParser {
  static async parseJourneys(filePath: string): Promise<Journey[]> {
    return new Promise((resolve, reject) => {
      const journeys: Journey[] = [];
      fs.createReadStream(filePath)
        .pipe(csv.parse({ columns: true, trim: true }))
        .on("data", (row) => {
          journeys.push({
            fromLine: row.FromLine,
            toLine: row.ToLine,
            dateTime: new Date(row.DateTime),
          });
        })
        .on("end", () => resolve(journeys))
        .on("error", reject);
    });
  }
}
