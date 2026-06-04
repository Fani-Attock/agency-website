import express from "express";
import cors from "cors";

const app = express();

// ✅ CORS configuration
app.use(cors({
  origin: "https://neuraflowai.vercel.app",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Backend running 🚀" });
});

// ✅ SMART CHAT BOT ROUTE
app.post("/api/chat", async (req, res) => {
  try {
    // Frontend alag alag keys bhej sakta hai, hum sabko check kar let hain taake khali "" na aaye
    const userText = req.body.message || req.body.text || req.body.prompt || req.body.input;

    if (!userText) {
      return res.status(200).json({ reply: "Mujhe aapka message nahi mila. Kya aap dobara likh sakte hain?" });
    }

    const cleanMessage = userText.toLowerCase().trim();
    let botReply = "";

    // 💡 OPTION A: Smart Auto-Replies (Agar aapke paas API Key nahi hai)
    if (cleanMessage.includes("service") || cleanMessage.includes("offer")) {
      botReply = "NeuraFlow AI aapko Custom AI Agents, Workflow Automation, aur Intelligent Systems ki services offer karta hai.";
    } else if (cleanMessage.includes("price") || cleanMessage.includes("cost") || cleanMessage.includes("fee")) {
      botReply = "Humare pricing plans aapki requirement ke mutabiq customize kiye jaate hain. Aap contact page par ja kar quote le sakte hain.";
    } else if (cleanMessage.includes("hello") || cleanMessage.includes("hi") || cleanMessage.includes("hey")) {
      botReply = "Hello! Main NeuraFlow AI Assistant hoon. Main aapki kya madad kar sakta hoon?";
    } else {
      // Default fallback reply
      botReply = `Aapne "${userText}" pucha. NeuraFlow AI is par kaam kar raha hai!`;
    }

    // 💡 OPTION B: Agar aap OpenAI integrate karna chahte hain, toh neeche wala comment hatayein:
    /*
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: userText }]
      })
    });
    const data = await response.json();
    botReply = data.choices[0].message.content;
    */

    // Sahi JSON response return karein
    res.status(200).json({ reply: botReply });

  } catch (error) {
    console.error("Chat API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;