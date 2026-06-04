import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.options("*", cors());

// ✅ CORS
app.use(cors({
  origin: "https://neuraflowai.vercel.app",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());

app.use(express.json());

// ✅ Gemini AI setup
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend running 🚀" });
});

// ✅ REAL CHAT ROUTE
app.post("/api/chat", async (req, res) => {
  try {
    const userText =
      req.body.message ||
      req.body.text ||
      req.body.prompt ||
      req.body.input;

    if (!userText) {
      return res.status(200).json({
        reply: "Mujhe aapka message nahi mila. Please dobara likhein."
      });
    }

    // 🚀 SYSTEM PROMPT (VERY IMPORTANT)
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: userText }],
        },
      ],
      config: {
        systemInstruction: `
You are NeuraFlow AI Assistant.
You are helpful, professional, and conversational.

Rules:
- Never say "I didn't receive your message"
- Always answer user properly
- If question is unclear, ask clarification
- Keep responses short and useful
        `,
      },
    });

    const botReply = result.text || "Sorry, mujhe samajh nahi aaya.";

    return res.status(200).json({ reply: botReply });

  } catch (error) {
    console.error("Chat API Error:", error);

    return res.status(500).json({
      reply: "Server error hua hai, please try again."
    });
  }
});

export default app;