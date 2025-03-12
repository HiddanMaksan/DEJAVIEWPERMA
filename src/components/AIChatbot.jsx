import React, { useState } from "react";
import axios from "axios";

export default function AIChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const API_KEY = "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"; // Replace with your actual API key
  const API_URL = "https://api.openai.com/v1/chat/completions";

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post(
        API_URL,
        {
          model: "gpt-4",
          messages: [...messages, userMessage],
        },
        {
          headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = response.data.choices[0].message;
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
    }

    setInput("");
  };

  return (
    <div style={{
      position: "fixed",
      bottom: "50px",
      right: "20px",
      width: "450px",
      backgroundColor: "#222",
      borderRadius: "10px",
      padding: "10px",
      boxShadow: "0px 0px 10px rgba(255, 136, 0, 0.5)"
    }}>
      <h3 style={{ color: "#ff8800" }}>Ask About This Property</h3>
      <div style={{ maxHeight: "200px", overflowY: "auto", padding: "5px", backgroundColor: "#333", borderRadius: "5px", color: "#fff" }}>
        {messages.map((msg, index) => (
          <p key={index} style={{ textAlign: msg.role === "user" ? "right" : "left", color: msg.role === "user" ? "#ff8800" : "#fff" }}>
            {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask a question..."
        style={{ width: "100%", padding: "5px", marginTop: "10px", borderRadius: "5px", border: "1px solid #ff8800", backgroundColor: "#333", color: "#fff" }}
      />
      <button onClick={sendMessage} style={{ width: "100%", marginTop: "5px", padding: "5px", backgroundColor: "#ff8800", color: "#1a1a1a", borderRadius: "5px", cursor: "pointer" }}>
        Send
      </button>
    </div>
  );
}
