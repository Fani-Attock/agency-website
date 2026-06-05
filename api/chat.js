export const config = {
  runtime: "edge",
};

const allowedOrigins = [
  "https://agency-website-jvxl.vercel.app",
  "https://neuraflowai.vercel.app",
  "http://localhost:5173",
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

  return headers;
}

export default async function handler(req) {
  const headers = corsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers,
    });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ reply: "Only POST allowed" }),
      { status: 405, headers }
    );
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ reply: "Missing GEMINI_API_KEY on server" }),
        { status: 500, headers }
      );
    }

    const body = await req.json().catch(() => null);
    const message = body?.message?.trim();

    if (!message) {
      return new Response(
        JSON.stringify({ reply: "Message is required" }),
        { status: 400, headers }
      );
    }

    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
        }),
      }
    );

    const data = await geminiResponse.json().catch(() => ({}));

    if (!geminiResponse.ok) {
      console.error("Gemini API Error:", data);

      return new Response(
        JSON.stringify({
          reply: "AI request failed",
          error: data.error?.message || "Gemini API error",
        }),
        { status: 500, headers }
      );
    }

    const text =
      data.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("")
        .trim() || "No response generated.";

    return new Response(
      JSON.stringify({ reply: text }),
      { status: 200, headers }
    );
  } catch (err) {
    console.error("Gemini Edge Error:", err);

    return new Response(
      JSON.stringify({
        reply: "AI request failed",
        error: err.message,
      }),
      { status: 500, headers }
    );
  }
}