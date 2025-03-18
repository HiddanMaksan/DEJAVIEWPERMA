import React, { useState } from "react";

export default function AIChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const API_KEY = "sk-7706e4e5201642beaaa10ddfc1d86291"; // Replace with your DeepSeek API key
  const API_URL = "https://api.deepseek.com/chat/completions";

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
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
          messages: [...messages, userMessage],
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
        position: "fixed", // Fix the chatbot to the screen
        top: "110px", // Adjust the top position as needed
        right: "40px", // Move the chatbot to the right
        width: "27%", // Adjust the width of the entire chatbot here
        maxWidth: "400px", // Set a max-width for better usability
        height: "80%", // Make the chatbot take full height (minus padding)
        padding: "10px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        zIndex: 1000, // Ensure it stays on top of other elements
        display: "flex",
        flexDirection: "column", // Stack children vertically
      }}
    >
      {/* Chat Messages */}
      <div
        style={{
          flex: 1, // Expand to fill remaining space
          overflowY: "auto", // Enable scrolling for messages
          marginBottom: "10px",
          padding: "15px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          border: "1px solid #ddd",
        }}
      >
        {messages.map((msg, index) => (
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
          onKeyPress={(e) => e.key === "Enter" && sendMessage()} // Send message on Enter key
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          style={{
            width:"30%", 
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