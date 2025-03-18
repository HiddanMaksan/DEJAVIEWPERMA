require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Load API key from .env

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message || "Hello";

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: userMessage }],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const botMessage = response.data.choices[0].message.content;
    res.json({ reply: botMessage });
  } catch (error) {
    console.error("Error fetching OpenAI response:", error);
    res.status(500).json({ reply: "Sorry, something went wrong!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
