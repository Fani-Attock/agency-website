import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "Only POST requests are allowed",
    });
  }

  try {
    const { message } = req.body;

    // Validation
    if (!message) {
      return res.status(400).json({
        reply: "Message is required",
      });
    }

    // System prompt (you can customize)
    const systemPrompt = `
You are NeuraFlow AI assistant.
You are a helpful, professional AI for an agency website.

Services:
- AI Automation
- Machine Learning
- Deep Learning
- Computer Vision
- AI SaaS Development

Rules:
- Keep answers short and clear
- Be professional
`;

    // Call Gemini AI
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${systemPrompt}\n\nUser: ${message}`,
    });

    // Response handling
    const reply =
      result.text || "Sorry, I could not generate a response.";

    return res.status(200).json({
      reply,
    });

  } catch (error) {
    console.error("Chat API Error:", error);

    return res.status(500).json({
      reply: "Server error: " + error.message,
    });
  }
}