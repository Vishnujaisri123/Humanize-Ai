import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

console.log("Loaded API Key:", process.env.OPENAI_API_KEY); // Debug

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:5173',   // Or your frontend domain
    'X-Title': 'Humanizer AI',                 // Optional, for analytics
  },
});

console.log("OpenAI initialized successfully.");

// Humanize endpoint
app.post("/api/humanize", async (req, res) => {
  try {
    const { prompt } = req.body;

    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Or "gpt-4" if your API key supports it
      messages: [
        {
          role: "system",
          content: "Convert robotic or technical text into natural, human-like language.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const result = chatResponse.choices[0].message.content.trim();
    res.json({ result });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`🧠 Humanizer AI server listening at http://localhost:${port}`);
});

app.post('/api/humanize', async (req, res) => {
  try {
    const { text } = req.body;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Make the following text sound more human and natural.' },
        { role: 'user', content: text }
      ],
      max_tokens: 200
    });

    const result = response.choices[0].message.content;
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong while calling the OpenAI API.' });
  }
});
