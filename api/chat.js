import { GoogleGenerativeAI } from "@google/generative-ai";

const allowedOrigins = [
  "https://neuraflowai.vercel.app",
  "http://localhost:5173",
];

export default async function handler(req, res) {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Only POST allowed" });
  }

  try {
    // 1. Check API Key inside the execution block
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ reply: "Missing API key on production server" });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { message } = body;

    if (!message) {
      return res.status(400).json({ reply: "Message is required" });
    }

    // 2. Initialize Google AI safely inside the handler
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // 3. Generate content
    const result = await model.generateContent(message);
    const response = await result.response;

    return res.status(200).json({
      reply: response.text(),
    });

  } catch (err) {
    console.error("Gemini Error:", err);

    return res.status(500).json({
      reply: "AI request failed",
      error_details: err.message // Is se agar koi aur masla hua to frontend pe dikh jaye ga
    });
  }
}