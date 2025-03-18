import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function LeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");
  const [sizePreference, setSizePreference] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !lookingFor || !propertyType || !budget || !sizePreference || !state) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "leads"), {
        name,
        email,
        lookingFor,
        propertyType,
        budget,
        sizePreference,
        state,
        timestamp: new Date(),
      });

      console.log("Lead Captured:", { name, email, lookingFor, propertyType, budget, sizePreference, state });
      navigate("/virtual-tour");
    } catch (error) {
      console.error("Error saving lead:", error);
      setError("Failed to submit. Check your internet or Firestore rules.");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #0077b6",
    backgroundColor: "#f0f0f0",
    color: "#333",
    fontSize: "16px",
    transition: "0.3s ease",
  };

  const buttonStyle = {
    padding: "12px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    width: "100%",
    backgroundColor: "#0077b6",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #0077b6, #023e8a)",
        color: "#fff",
        textAlign: "center",
      }}
    >
      {/* DejaView Text Logo */}
      <div
        style={{
          backgroundColor: "transparent",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h1 style={{ color: "white", fontSize: "36px", fontWeight: "bold" }}>DejaView</h1>
      </div>

      <p style={{ fontSize: "18px", marginBottom: "20px", color: "#ccc" }}>Enter your details to unlock the 360° Virtual Tour.</p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0px 0px 20px rgba(0, 119, 182, 0.5)",
          width: "320px",
        }}
      >
        <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
        <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />

        <select value={lookingFor} onChange={(e) => setLookingFor(e.target.value)} required style={inputStyle}>
          <option value="">What are you looking for?</option>
          <option value="rent">To rent</option>
          <option value="purchase">Purchase</option>
          <option value="looking">Just Looking around</option>
          <option value="investments">Investments</option>
        </select>

        <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} required style={inputStyle}>
          <option value="">Select Property Type</option>
          <option value="apartment">Apartment</option>
          <option value="bungalow">Bungalow</option>
          <option value="condo">Condo</option>
          <option value="townhouse">Townhouse</option>
        </select>

        <select value={budget} onChange={(e) => setBudget(e.target.value)} required style={inputStyle}>
          <option value="">Select Budget Range</option>
          {[...Array(16)].map((_, i) => (
            <option key={i} value={`${i * 200000}`}>{`RM${i * 200000} - RM${(i + 1) * 200000}`}</option>
          ))}
          <option value="3000000+">RM3M+</option>
        </select>

        <select value={sizePreference} onChange={(e) => setSizePreference(e.target.value)} required style={inputStyle}>
          <option value="">Select Size Preference</option>
          {[...Array(7)].map((_, i) => (
            <option key={i} value={`${i * 500}`}>{`${i * 500} - ${(i + 1) * 500} sqft`}</option>
          ))}
        </select>

        <select value={state} onChange={(e) => setState(e.target.value)} required style={inputStyle}>
          <option value="">Select State</option>
          {["Selangor", "Penang", "Kedah", "Perlis", "Terengganu", "Kelantan", "Pahang", "Melaka", "Negeri Sembilan", "Johor", "Sabah", "Sarawak", "Wilayah Persekutuan", "Labuan"].map((s) => (
            <option key={s} value={s.toLowerCase()}>{s}</option>
          ))}
        </select>

        <button type="submit" style={buttonStyle}>View Virtual Tour</button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </form>
    </div>
  );
}
