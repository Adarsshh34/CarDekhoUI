import React, { useState } from "react";
import axios from "axios";

export default function CarPreference({ setResults }) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  //   const [results, setResults] = useState(null);

  const [formData, setFormData] = useState({
    budget: "",
    fuelType: "",
    bodyType: "",
    seats: "",
    transmission: "",
    priority: "",
  });

  const questions = [
    {
      key: "budget",
      title: "💰 What's your budget?",
      type: "input",
      placeholder: "Enter budget in ₹",
    },
    {
      key: "fuelType",
      title: "⛽ Preferred fuel type?",
      type: "options",
      options: ["Petrol", "Diesel", "Electric", "Hybrid", "Any"],
    },
    {
      key: "bodyType",
      title: "🚘 Which car type do you prefer?",
      type: "options",
      options: ["Hatchback", "Sedan", "SUV", "MPV", "Any"],
    },
    {
      key: "seats",
      title: "👨‍👩‍👧‍👦 How many seats do you need?",
      type: "options",
      options: ["5", "7"],
    },
    {
      key: "transmission",
      title: "⚙️ Preferred transmission?",
      type: "options",
      options: ["Manual", "Automatic", "Any"],
    },
    {
      key: "priority",
      title: "⭐ What's your top priority?",
      type: "options",
      options: [
        "Mileage",
        "Safety",
        "Performance",
        "Features",
        "Low Maintenance",
      ],
    },
  ];

  const current = questions[step];

  const handleChange = (value) => {
    setFormData({
      ...formData,
      [current.key]: value,
    });
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const submitPreferences = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://cardekhobe.onrender.com/recommend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            budget: Number(formData.budget),
          }),
        }
      );

      const data = await response.json();
      setResults(data.recommendations);
      //   setResults()

      console.log("Recommended Cars:", data);

      alert("Top 3 Cars Received 🚗 Check Console");

      // Optional:
      // navigate("/results", { state: response.data });
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = async () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      console.log("Submit Preferences:", formData);
      alert("Preferences Submitted 🚗");
      await submitPreferences();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Progress */}
        <div style={styles.progressWrapper}>
          <div
            style={{
              ...styles.progressBar,
              width: `${((step + 1) / questions.length) * 100}%`,
            }}
          />
        </div>

        {/* Question */}
        <h2 style={styles.title}>{current.title}</h2>

        {/* Input Type */}
        {current.type === "input" ? (
          <input
            type="number"
            placeholder={current.placeholder}
            value={formData[current.key]}
            onChange={(e) => handleChange(e.target.value)}
            style={styles.input}
          />
        ) : (
          <div style={styles.optionsWrapper}>
            {current.options.map((item) => (
              <button
                key={item}
                onClick={() => handleChange(item)}
                style={{
                  ...styles.optionBtn,
                  background:
                    formData[current.key] === item ? "#007bff" : "#f1f3f5",
                  color: formData[current.key] === item ? "#fff" : "#333",
                }}
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div style={styles.nav}>
          <button
            onClick={prevStep}
            disabled={step === 0}
            style={{
              ...styles.navBtn,
              opacity: step === 0 ? 0.5 : 1,
            }}
          >
            ← Prev
          </button>

          <button onClick={nextStep} style={styles.nextBtn} disabled={loading}>
            {loading
              ? "Loading..."
              : step === questions.length - 1
              ? "Submit 🚀"
              : "Next →"}
          </button>
        </div>

        {/* Step Count */}
        <p style={styles.stepText}>
          Step {step + 1} of {questions.length}
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e0f7ff, #f7f9fc)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "550px",
    background: "#fff",
    borderRadius: "18px",
    padding: "35px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  progressWrapper: {
    width: "100%",
    height: "8px",
    background: "#eee",
    borderRadius: "20px",
    overflow: "hidden",
    marginBottom: "30px",
  },

  progressBar: {
    height: "100%",
    background: "#007bff",
    transition: "0.4s",
  },

  title: {
    fontSize: "28px",
    marginBottom: "30px",
    color: "#111",
  },

  input: {
    width: "100%",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "18px",
    marginBottom: "25px",
  },

  optionsWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
    marginBottom: "30px",
  },

  optionBtn: {
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
    fontWeight: "600",
  },

  nav: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },

  navBtn: {
    padding: "12px 20px",
    borderRadius: "10px",
    border: "none",
    background: "#dee2e6",
    cursor: "pointer",
    fontWeight: "bold",
  },

  nextBtn: {
    padding: "12px 22px",
    borderRadius: "10px",
    border: "none",
    background: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },

  stepText: {
    marginTop: "20px",
    color: "#666",
    fontSize: "14px",
  },
};
