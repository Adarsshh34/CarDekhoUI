import React from "react";

const Result = ({ cars }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>🏆 Top Recommended Cars</h1>

      {cars.map((car) => (
        <div
          key={car.id}
          style={{
            border: "1px solid #ddd",
            margin: "10px",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          <h2>
            {car.make} {car.model}
          </h2>

          <p>💰 Price: ₹{car.price}</p>
          <p>⛽ Fuel: {car.fuelType}</p>
          <p>⭐ Safety: {car.safetyRating}</p>
          <p>📊 Score: {car.score}</p>
        </div>
      ))}
    </div>
  );
};

export default Result;
