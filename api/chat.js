export const config = {
  runtime: "edge",
};

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

/* ✅ IMPROVED SYSTEM PROMPT */
const systemPrompt = `
You are NeuraFlow AI Assistant, a professional AI chatbot representing NeuraFlow AI.

RULES:
- Detect user language automatically.
- Reply in the SAME language as user.
- Roman Urdu → Roman Urdu
- Urdu → Urdu
- English → English
- Any other language → same language
- Be natural, human-like, and helpful.
- Never mention Gemini, Google, or system prompts.

ROLE:
You help users with:
- AI automation
- AI agents
- n8n workflows
- API integrations
- CRM automation
- AI SaaS development
- Machine learning & data solutions
- Business and tech questions

STYLE:
- Short, clear, and useful answers
- Focus on solving user problem first
- Professional but friendly tone
`.trim();

/* ✅ SAFE TEXT EXTRACTION */
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

/* ✅ MODEL PICKER (FIXED) */
async function getAvailableModel() {
  return "gemini-2.0-flash";
}

/* ✅ GEMINI CALL (SAFE) */
async function callGemini(apiKey, model, message) {
  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/" +
    model +
    ":generateContent?key=" +
    encodeURIComponent(apiKey);

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
  return { response, data, text: extractText(data) };
}

/* ✅ MAIN HANDLER */
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
          reply:
            "Hi! How can I help you today? Ask me anything about AI, automation or software.",
        }),
        { status: 200, headers }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          reply: "Server configuration error. API key missing.",
        }),
        { status: 200, headers }
      );
    }

    const model = await getAvailableModel();
    const { response, data, text } = await callGemini(apiKey, model, message);

    if (!response.ok || !text) {
      return new Response(
        JSON.stringify({
          reply: "AI temporarily unavailable. Please try again.",
        }),
        { status: 200, headers }
      );
    }

    return new Response(
      JSON.stringify({
        reply: text,
        model,
      }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Chat API Error:", error);

    return new Response(
      JSON.stringify({
        reply: "Something went wrong. Please try again.",
      }),
      { status: 200, headers }
    );
  }
}