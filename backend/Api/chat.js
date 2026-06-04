import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  const setCors = () => {
    res.setHeader("Access-Control-Allow-Origin", "https://neuraflowai.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  };

  setCors();

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const message = body?.message;

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

    const botReply =
      result?.response?.text?.() ||
      result?.text ||
      "No response";

    return res.status(200).json({
      reply: botReply
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      reply: "Server error: " + err.message
    });
  }
}