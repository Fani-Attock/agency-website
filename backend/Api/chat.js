export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { message } = req.body;

    // 👇 yahan tum apna AI logic lagao (Gemini/OpenAI)
    const reply = `You said: ${message}`;

    return res.status(200).json({
      reply,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server error",
    });
  }
}