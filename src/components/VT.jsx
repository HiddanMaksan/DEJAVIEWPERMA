import React, { useState } from "react";
import LeadForm from "./LeadForm";
import AIChatbot from "./AIChatbot";

export default function VirtualTourPage() {
  const [leadData, setLeadData] = useState(null);

  const handleLeadSubmit = (data) => {
    setLeadData(data); // Save lead data to state
  };

  return (
    <div>
      {/* Render the LeadForm and pass the onSubmit handler */}
      <LeadForm onSubmit={handleLeadSubmit} />

      {/* Render the AIChatbot if leadData exists */}
      {leadData && <AIChatbot leadData={leadData} />}
    </div>
  );
}