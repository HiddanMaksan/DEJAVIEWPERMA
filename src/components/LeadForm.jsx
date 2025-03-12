import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"; // Import Firestore instance
import { collection, addDoc } from "firebase/firestore";

export default function LeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset errors before submission

    if (!name || !email) {
      setError("Please enter both name and email.");
      return;
    }

    try {
      await addDoc(collection(db, "leads"), {
        name: name,
        email: email,
        timestamp: new Date(),
      });

      console.log("Lead Captured:", { name, email });
      navigate("/virtual-tour"); // Redirect after successful submission
    } catch (error) {
      console.error("Error saving lead:", error);
      setError("Failed to submit. Check your internet or Firestore rules.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #1a1a1a, #2e2e2e)",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "30px", color: "#ff8800", marginBottom: "10px", fontWeight: "bold" }}>
        Get Exclusive Access
      </h2>
      <p style={{ fontSize: "18px", marginBottom: "20px", color: "#ccc" }}>
        Enter your details to unlock the 360° Virtual Tour.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          backgroundColor: "#222",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0px 0px 20px rgba(255, 136, 0, 0.5)",
          width: "320px",
        }}
      >
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ff8800",
            backgroundColor: "#333",
            color: "#fff",
            fontSize: "16px",
            transition: "0.3s ease",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#e67300")}
          onBlur={(e) => (e.target.style.borderColor = "#ff8800")}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ff8800",
            backgroundColor: "#333",
            color: "#fff",
            fontSize: "16px",
            transition: "0.3s ease",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#e67300")}
          onBlur={(e) => (e.target.style.borderColor = "#ff8800")}
        />

        <button
          type="submit"
          style={{
            padding: "12px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            width: "100%",
            backgroundColor: "#ff8800",
            color: "#1a1a1a",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#e67300")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ff8800")}
        >
          View Virtual Tour
        </button>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </form>
    </div>
  );
}
   