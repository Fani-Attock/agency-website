import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default async function handler(req, res) {
  // ✅ CORS HEADERS (IMPORTANT)
  res.setHeader("Access-Control-Allow-Origin", "https://neuraflowai.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // ✅ Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Only POST allowed" });
  }

  try {
    const { message } = req.body;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `User: ${message}`,
    });

    res.status(200).json({
      reply: result.text || "No response",
    });
  } catch (error) {
    res.status(500).json({
      reply: error.message,
    });
  }
}