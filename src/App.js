import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeadForm from "./components/LeadForm.jsx";
import VirtualTour from "./components/VirtualTour.jsx";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LeadForm />} />
        <Route path="/virtual-tour" element={<VirtualTour />} />
      </Routes>
    </Router>
  );
}
