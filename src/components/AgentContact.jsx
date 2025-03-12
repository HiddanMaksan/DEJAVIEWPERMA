import React from "react";

export default function AgentContact() {
  const handleContact = () => {
    alert("Contacting Agent...");
    // Replace with an actual contact method (e.g., call, email, WhatsApp)
  };

  return <button onClick={handleContact}>Contact Agent</button>;
}
