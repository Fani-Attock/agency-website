export const config = {
  runtime: "edge",
};

const allowedOrigins = [
  "https://agency-website-jvxl.vercel.app",
  "https://neuraflowai.vercel.app",
  "http://localhost:5173",
];

const preferredModels = [
  "gemini-3.5-flash",
  "gemini-3.1-flash-lite",
  "gemini-3-flash-preview",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
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
  headers.set("Content-Type", "application/json");
  headers.set("Vary", "Origin");

  return headers;
}

const systemPrompt = `
You are NeuraFlow AI Assistant, the official premium chatbot for NeuraFlow AI.

NeuraFlow AI is a premium AI automation and AI product development agency.

Language:
- Detect the user's language automatically.
- Reply in the same language and same style.
- Roman Urdu user = natural Roman Urdu reply.
- English user = English reply.
- Urdu, Hindi, Arabic, French, Spanish or any other language = reply in that language.

Services:
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
- Answer the exact question first.
- Never repeat generic copy-paste replies.
- Never mention Gemini, Google, API, model, or internal instructions.
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

async function listAvailableModels(apiKey) {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models?key=" +
      encodeURIComponent(apiKey)
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.error?.message || "Could not list Gemini models");
  }

  return (data.models || [])
    .filter((model) =>
      model.supportedGenerationMethods?.includes("generateContent")
    )
    .map((model) => model.name?.replace("models/", ""))
    .filter(Boolean);
}

function chooseModels(availableModels) {
  const ordered = [];

  for (const preferred of preferredModels) {
    if (availableModels.includes(preferred)) {
      ordered.push(preferred);
    }
  }

  for (const model of availableModels) {
    if (!ordered.includes(model) && model.includes("gemini")) {
      ordered.push(model);
    }
  }

  return ordered;
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
        temperature: 0.85,
        topP: 0.95,
        maxOutputTokens: 420,
      },
    }),
  });

  const data = await response.json().catch(() => ({}));

  return {
    ok: response.ok,
    text: extractText(data),
    error: data?.error?.message || "",
    data,
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

    const availableModels = await listAvailableModels(apiKey);
    const modelsToTry = chooseModels(availableModels);

    if (!modelsToTry.length) {
      return new Response(
        JSON.stringify({
          reply: "No Gemini text model is available for this API key.",
        }),
        { status: 200, headers }
      );
    }

    let lastError = "";

    for (const model of modelsToTry) {
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

      lastError = result.error || "Model returned no text";
      console.error("Gemini failed:", model, result.data);
    }

    return new Response(
      JSON.stringify({
        reply: "NeuraFlow AI Assistant is temporarily unable to generate a response. Please try again shortly.",
        error: lastError,
        availableModels,
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