import React, { useState, useEffect } from "react";

export default function AIChatbot({ leadData }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = "sk-7706e4e5201642beaaa10ddfc1d86291"; // Replace with your DeepSeek API key
  const API_URL = "https://api.deepseek.com/chat/completions";

  // Add lead data as initial context for the chatbot
  useEffect(() => {
    if (leadData) {
      const initialMessage = {
        role: "system",
        content: `You are a helpful assistant. The user has provided the following details: 
        - Name: ${leadData.name}
        - Email: ${leadData.email}
        - Looking for: ${leadData.lookingFor}
        - Property type: ${leadData.propertyType}
        - Budget: ${leadData.budget}
        - Size preference: ${leadData.sizePreference}
        - State: ${leadData.state}
        - District: ${leadData.district}.
        Use this information to provide personalized responses.`,
      };
      setMessages([initialMessage]);
    }
  }, [leadData]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage]; // Include the latest system message
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: updatedMessages, // Use the updated messages array
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = data.choices[0].message;
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage = {
        role: "system",
        content: "Sorry, something went wrong. Please try again.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "110px",
        right: "40px",
        width: "27%",
        maxWidth: "400px",
        height: "80%",
        padding: "10px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Chat Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          marginBottom: "10px",
          padding: "15px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          border: "1px solid #ddd",
        }}
      >
        {messages
          .filter((msg) => msg.role !== "system") // Hide system messages from the UI
          .map((msg, index) => (
            <div
              key={index}
              style={{
                textAlign: msg.role === "user" ? "right" : "left",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  backgroundColor: msg.role === "user" ? "#007bff" : "#28a745",
                  color: "#fff",
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}
        {isLoading && (
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "10px",
                backgroundColor: "#6c757d",
                color: "#fff",
              }}
            >
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input and Send Button */}
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          disabled={isLoading}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          style={{
            width: "30%",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}