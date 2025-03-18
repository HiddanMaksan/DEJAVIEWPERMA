import React from "react";
import AIChatbot from "./AIChatbot"; // Import the AIChatbot component

export default function VirtualTour() {
  const modelId = "y5R1rtv1vTf"; // Matterport model ID

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row", // Align items horizontally
        alignItems: "center", // Center items vertically
        justifyContent: "space-between", // Space between the two components
        padding: "30px",
        backgroundColor: "#0077b6", // Blue background
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      {/* Matterport 3D Showcase (Left Side, 70% Width) */}
      <div
        style={{
          width: "70%", // Takes 70% of the screen width
          height: "90vh", // Takes 90% of the screen height
          border: "4px solid #023e8a", // Darker blue border
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0px 0px 20px rgba(0, 119, 182, 0.5)", // Blue shadow
          marginRight: "20px", // Add margin to separate from the chatbot
        }}
      >
        <iframe
          title="Matterport Virtual Tour"
          src={`https://my.matterport.com/show/?m=${modelId}`}
          style={{ width: "100%", height: "100%", border: "none", borderRadius: "8px", display: "block" }}
          allowFullScreen
        ></iframe>
      </div>

      {/* AI Chatbot (Right Side, 30% Width) */}
      <div
        style={{
          width: "30%", // Takes 30% of the screen width
          backgroundColor: "#fff", // White background
          borderRadius: "12px",
          padding: "15px",
          boxShadow: "0px 0px 20px rgba(0, 119, 182, 0.5)", // Blue shadow
          height: "90vh", // Matches the height of the Matterport showcase
          display: "flex",
          flexDirection: "column", // Stack children vertically
        }}
      >
        {/* Header with "DejaView" */}
        <div
          style={{
            backgroundColor: "#023e8a", // Dark blue background
            color: "#fff", // White text
            padding: "15px",
            borderRadius: "8px",
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "20px", // Space between header and chatbot
          }}
        >
          DejaView
        </div>

        {/* Chatbot Component */}
        <AIChatbot />
      </div>
    </div>
  );
}