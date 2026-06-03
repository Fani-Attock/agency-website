import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Only POST allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message required" });
    }

    const systemPrompt = `
You are NeuraFlow AI assistant...
Keep responses short and professional.
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${systemPrompt}\nUser: ${message}`,
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