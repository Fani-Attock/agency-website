import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  try {
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const message = req.body?.message;

    if (!message) {
      return res.status(200).json({
        reply: "Mujhe aapka message nahi mila."
      });
    }

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