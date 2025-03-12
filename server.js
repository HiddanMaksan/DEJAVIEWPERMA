const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/chat", (req, res) => {
  const userMessage = req.body.message || "Hello";
  res.json({ reply: `AI Chatbot says: You said "${userMessage}"` });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
