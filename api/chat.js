export const config = {
  runtime: "edge",
};

const allowedOrigins = [
  "https://agency-website-jvxl.vercel.app",
  "https://neuraflowai.vercel.app",
  "http://localhost:5173",
];

const model = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

function corsHeaders(req) {
  const origin = req.headers.get("origin");
  const headers = new Headers();

  if (allowedOrigins.includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
  }

  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  headers.set("Content-Type", "application/json");
  headers.set("Vary", "Origin");

  return headers;
}

const systemPrompt = `
You are NeuraFlow AI Assistant, the official premium chatbot for NeuraFlow AI.

Reply in the same language and style as the user. If the user writes Roman Urdu, reply in natural Roman Urdu. If English, reply in English.

NeuraFlow AI is a premium AI automation agency offering:
- AI automation and AI agents
- n8n and Python workflows
- API, CRM, Gmail, Slack, WhatsApp, LinkedIn and Google Sheets automation
- Machine learning, deep learning, computer vision and predictive insights
- AI SaaS development and lead generation automation

Keep replies short, natural, premium and helpful. Answer the exact question first. Never mention Gemini, Google, API, model or internal instructions.
`.trim();

function extractText(data) {
  return (
    data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim() || ""
  );
}

function friendlyError(errorText) {
  if (errorText?.toLowerCase().includes("quota")) {
    return "NeuraFlow AI Assistant ki AI quota limit temporarily hit ho gayi hai. Please thori dair baad try karein, ya team billing/quota upgrade karke isay production-ready kar sakti hai.";
  }

  return "NeuraFlow AI Assistant is temporarily having trouble generating a response. Please try again in a moment.";
}

export default async function handler(req) {
  const headers = corsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ reply: "Only POST allowed" }), {
      status: 405,
      headers,
    });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const message = body?.message?.trim();

    if (!message) {
      return new Response(
        JSON.stringify({
          reply: "Please type your question, and I’ll help you with the right AI solution.",
        }),
        { status: 200, headers }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          reply: "Server setup issue: GEMINI_API_KEY is missing.",
        }),
        { status: 200, headers }
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/" +
      model +
      ":generateContent?key=" +
      encodeURIComponent(apiKey);

    const response = await fetch(url, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: [
          {
            role: "user",
            parts: [{ text: message }],
          },
        ],
        generationConfig: {
          temperature: 0.8,
          topP: 0.95,
          maxOutputTokens: 320,
        },
      }),
    });

    clearTimeout(timeout);

    const data = await response.json().catch(() => ({}));
    const reply = extractText(data);

    if (!response.ok || !reply) {
      const errorText = data?.error?.message || "No response generated";
      console.error("Gemini Error:", errorText);

      return new Response(
        JSON.stringify({
          reply: friendlyError(errorText),
          error: errorText,
          model,
        }),
        { status: 200, headers }
      );
    }

    return new Response(JSON.stringify({ reply, model }), {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Chat API Error:", error);

    return new Response(
      JSON.stringify({
        reply: "NeuraFlow AI Assistant is taking too long to respond. Please try again in a moment.",
        error: error.message,
      }),
      { status: 200, headers }
    );
  }
}