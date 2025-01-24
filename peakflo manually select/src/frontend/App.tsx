import React, { useState } from "react";
import { FareCalculator } from "../backend/fareCalculator";
import { Journey } from "../backend/types";

const App: React.FC = () => {
  const [fromLine, setFromLine] = useState("Green");
  const [toLine, setToLine] = useState("Green");
  const [dateTime, setDateTime] = useState("");
  const [fare, setFare] = useState<number | null>(null);

  const calculator = new FareCalculator();

  const handleCalculate = () => {
    const journey: Journey = {
      fromLine,
      toLine,
      dateTime: new Date(dateTime),
    };

    try {
      const calculatedFare = calculator.calculateFare(journey);
      setFare(calculatedFare);
    } catch (error) {
      alert("Invalid journey details");
    }
  };

  return (
    <div className="container">
      <h1>Singa Metro Fare Calculator</h1>
      <div>
        <label>From Line:</label>
        <select value={fromLine} onChange={(e) => setFromLine(e.target.value)}>
          <option>Green</option>
          <option>Red</option>
        </select>
      </div>
      <div>
        <label>To Line:</label>
        <select value={toLine} onChange={(e) => setToLine(e.target.value)}>
          <option>Green</option>
          <option>Red</option>
        </select>
      </div>
      <div>
        <label>Date and Time:</label>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
        />
      </div>
      <button onClick={handleCalculate}>Calculate Fare</button>
      {fare !== null && (
        <div>
          <h2>Calculated Fare: ${fare}</h2>
        </div>
      )}
    </div>
  );
};

export default App;
