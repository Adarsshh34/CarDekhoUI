import CarPreference from "./components/CarPreference";
import "./styles.css";
import React, { useState } from "react";
import Result from "./components/Result";

export default function App() {
  const [results, setResults] = useState(null);
  return (
    <div className="App">
      {results ? (
        <Result cars={results} />
      ) : (
        <CarPreference setResults={setResults} />
      )}
    </div>
  );
}
