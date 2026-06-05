import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = {
  runtime: 'edge', // Vercel par super-fast aur error-free execution ke liye
};

const allowedOrigins = [
  "https://neuraflowai.vercel.app",
  "http://localhost:5173",
];

export default async function handler(req) {
  const origin = req.headers.get("origin");
  const headers = new Headers();

  if (allowedOrigins.includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
  }
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");

  // Handle CORS Preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ reply: "Only POST allowed" }), { status: 405, headers });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ reply: "Missing API key on server" }), { status: 500, headers });
    }

    const body = await req.json();
    const { message } = body;

    if (!message) {
      return new Response(JSON.stringify({ reply: "Message is required" }), { status: 400, headers });
    }

    // Initialize Gemini safely inside execution
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    headers.set("Content-Type", "application/json");
    return new Response(JSON.stringify({ reply: text }), { status: 200, headers });

  } catch (err) {
    console.error("Gemini Edge Error:", err);
    headers.set("Content-Type", "application/json");
    return new Response(JSON.stringify({ reply: "AI request failed", error: err.message }), { status: 500, headers });
  }
}