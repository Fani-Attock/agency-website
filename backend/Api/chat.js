import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  // 🔥 MUST for CORS
  res.setHeader("Access-Control-Allow-Origin", "https://neuraflowai.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const message = req.body?.message;

    if (!message) {
      return res.status(200).json({
        reply: "Message missing"
      });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
    });

    return res.status(200).json({
      reply: result.text || "No response"
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      reply: "Server error"
    });
  }
}