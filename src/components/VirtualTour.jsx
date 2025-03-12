import React from "react";
import AIChatbot from "./AIChatbot";

export default function VirtualTour() {
  const modelId = "y5R1rtv1vTf";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // Stack items vertically
        alignItems: "flex-start",
        padding: "30px",
        backgroundColor: "#1a1a1a",
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      {/* AI Chatbot (Takes More Space at the Top) */}
      <div
        style={{
          width: "57%", // Increased width
          backgroundColor: "#2a2a2a",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0px 0px 20px rgba(255, 136, 0, 0.5)",
          marginBottom: "20px", // Space before the 3D tour
        }}
      >
        <AIChatbot />
      </div>

      {/* Matterport 3D Showcase (Pushed Down) */}
      <div
        style={{
          width: "60%", // Matches chatbot width
          height: "70vh", // Takes half of the screen
          border: "4px solid #ff8800",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0px 0px 20px rgba(255, 136, 0, 0.5)",
        }}
      >
        <iframe
          title="Matterport Virtual Tour"
          src={`https://my.matterport.com/show/?m=${modelId}`}
          style={{ width: "100%", height: "100%", border: "none", borderRadius: "8px", display: "block" }}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
