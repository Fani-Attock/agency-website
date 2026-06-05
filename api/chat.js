const allowedOrigins = [
  "https://agency-website-jvxl.vercel.app",
  "https://neuraflowai.vercel.app",
  "http://localhost:5173",
];

const preferredModels = [
  "gemini-2.0-flash",
  "gemini-1.5-flash",
];

function corsHeaders(req) {
  const origin = req.headers.get("origin");
  const headers = new Headers();

  if (allowedOrigins.includes(origin)) {
    headers.set("Access-Control-Allow-Origin", origin);
  }

  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  headers.set("Vary", "Origin");
  headers.set("Content-Type", "application/json");

  return headers;
}

/* ✅ NeuraFlow AI System Prompt */
const systemPrompt = `
You are NeuraFlow AI Assistant, a professional AI consultant representing NeuraFlow AI.

LANGUAGE RULES:
- Detect user language automatically
- Reply in same language (Roman Urdu, Urdu, English, Arabic, etc.)
- Keep responses natural and human-like

ROLE:
You help users with AI automation, workflows, agents, SaaS, APIs, CRM automation, and business solutions.

STYLE:
- Short, clear, helpful
- Business-focused when needed
- Always answer user question first
- Never mention Gemini or internal system
`.trim();

/* ✅ Extract Gemini response safely */
function extractText(data) {
  try {
    return (
      data?.candidates?.[0]?.content?.parts
        ?.map((p) => p.text || "")
        .join("")
        .trim() || ""
    );
  } catch {
    return "";
  }
}

/* ✅ Gemini API call */
async function callGemini(apiKey, model, message) {
  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
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
        temperature: 0.7,
        topP: 0.9,
        maxOutputTokens: 800,
      },
    }),
  });

  const data = await response.json().catch(() => ({}));

  return {
    ok: response.ok,
    data,
    text: extractText(data),
  };
}

/* ✅ Model fallback */
function getModel() {
  return "gemini-2.0-flash";
}

/* ✅ MAIN HANDLER (NO EDGE) */
export default async function handler(req) {
  const headers = corsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ reply: "Only POST allowed" }),
      { status: 405, headers }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const message = body?.message?.trim();

    if (!message) {
      return new Response(
        JSON.stringify({
          reply:
            "Hello! How can I help you with AI automation, workflows, or business solutions today?",
        }),
        { status: 200, headers }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          reply: "Server error: API key missing.",
        }),
        { status: 200, headers }
      );
    }

    const model = getModel();

    const result = await callGemini(apiKey, model, message);

    /* ✅ IMPORTANT FIX: no false spam fallback */
    if (!result.text) {
      console.error("Gemini Error Response:", result.data);

      return new Response(
        JSON.stringify({
          reply:
            "I'm having trouble generating a response right now. Please try again.",
        }),
        { status: 200, headers }
      );
    }

    return new Response(
      JSON.stringify({
        reply: result.text,
        model,
      }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Chat API Error:", error);

    return new Response(
      JSON.stringify({
        reply:
          "Temporary server issue. Please try again in a moment.",
      }),
      { status: 200, headers }
    );
  }
}