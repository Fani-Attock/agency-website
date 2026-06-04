import express from "express";
import cors from "cors";

const app = express();

// ✅ CORS configuration (Frontend ko handle karne ke liye)
app.use(cors({
  origin: "https://neuraflowai.vercel.app",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// 1️⃣ Test Route (Yeh dekhne ke liye ke backend chal raha hai)
app.get("/", (req, res) => {
  res.json({ message: "Backend running 🚀" });
});

// 2️⃣ CHAT BOT ROUTE (Jo frontend dhoond raha hai aur pehle missing tha)
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body; // Frontend se aane wala user ka message

    // 💡 YAHAN AAP APNA AI/OPENAI LOGIC DAAL SAKTE HAIN.
    // Abhi test karne ke liye hum ek dummy reply bhej rahe hain:
    const botReply = `Aapne kaha: "${message}". NeuraFlow AI backend successfully connect ho chuka hai!`;

    // Sahi JSON response wapis bhein jo frontend samajh sake
    res.status(200).json({ reply: botReply });

  } catch (error) {
    console.error("Chat API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// IMPORTANT: Vercel serverless functions ke liye app.listen() nahi lagate
export default app;