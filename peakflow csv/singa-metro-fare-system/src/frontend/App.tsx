// src/frontend/App.tsx
import React, { useState } from "react";
import { processCSV } from "../backend/csvProcessor";

const App: React.FC = () => {
  const [totalFare, setTotalFare] = useState<number | null>(null);
  const [journeyCount, setJourneyCount] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setErrorMessage(null);
      const { totalFare, journeys } = await processCSV(file);
      setTotalFare(totalFare);
      setJourneyCount(journeys.length);
    } catch (error) {
      console.error("CSV Processing Error", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Unknown error processing CSV"
      );
    }
  };

  return (
    <div className="container">
      <h1>Singa Metro Fare Calculator</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {errorMessage && (
        <div style={{ color: "red" }}>Error: {errorMessage}</div>
      )}
      {totalFare !== null && (
        <div>
          <h2>Total Fare: ${totalFare.toFixed(2)}</h2>
          <p>Number of Journeys: {journeyCount}</p>
        </div>
      )}
    </div>
  );
};

export default App;
