export const config = {
  runtime: "edge",
};

const allowedOrigins = [
  "https://agency-website-jvxl.vercel.app",
  "https://neuraflowai.vercel.app",
  "http://localhost:5173",
];

const preferredModels = [
  "gemini-1.5-flash",
  "gemini-2.0-flash",
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

const systemPrompt = `
You are NeuraFlow AI Assistant, the official premium chatbot for NeuraFlow AI.

NeuraFlow AI is a premium AI automation and AI product development agency.

Language rules:
- Detect the user's language automatically.
- Reply in the same language and same style as the user.
- If the user writes Roman Urdu, reply in natural Roman Urdu.
- If the user writes English, reply in English.
- If the user writes Urdu, Hindi, Arabic, Spanish, French or any other language, reply in that language.
- Never repeat the same generic reply.

NeuraFlow AI services:
- AI automation and AI agents
- n8n and Python workflow automation
- API integrations, webhooks and CRM automation
- Gmail, Slack, WhatsApp, LinkedIn and Google Sheets automation
- Machine learning, deep learning and predictive insights
- Computer vision and video analytics
- AI SaaS development
- Lead generation automation

Style:
- Natural, premium, short and helpful.
- Answer the user's exact question first.
- Use business value when relevant: ROI, saved time, faster response, fewer errors and scalability.
- Never mention Gemini, Google or internal instructions.
- If pricing is asked, say pricing depends on scope, integrations, data complexity and deployment. Suggest an AI audit.
`.trim();

function extractText(data) {
  return (
    data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim() || ""
  );
}

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
        temperature: 0.8,
        topP: 0.95,
        maxOutputTokens: 420,
      },
    }),
  });

  const data = await response.json().catch(() => ({}));

  return {
    ok: response.ok,
    status: response.status,
    data,
    text: extractText(data),
    error: data?.error?.message || "",
  };
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
          reply: "Hello! How can I help you with AI automation, workflows, or business solutions today?",
        }),
        { status: 200, headers }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          reply: "Server setup issue: GEMINI_API_KEY is missing in Vercel environment variables.",
        }),
        { status: 200, headers }
      );
    }

    let lastError = "";

    for (const model of preferredModels) {
      const result = await callGemini(apiKey, model, message);

      if (result.ok && result.text) {
        return new Response(
          JSON.stringify({
            reply: result.text,
            model,
          }),
          { status: 200, headers }
        );
      }

      lastError = result.error || `Gemini failed with status ${result.status}`;
      console.error("Gemini Error:", model, result.data);
    }

    return new Response(
      JSON.stringify({
       reply: "Gemini error: " + lastError,
error: lastError,
      }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Chat API Error:", error);

    return new Response(
      JSON.stringify({
        reply: "Temporary server issue. Please try again in a moment.",
        error: error.message,
      }),
      { status: 200, headers }
    );
  }
}