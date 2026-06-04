import express from "express";
import cors from "cors";

const app = express();

// ✅ CORS configuration (important for your frontend)
app.use(cors({
  origin: "https://neuraflowai.vercel.app",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({ message: "Backend running 🚀" });
});

// IMPORTANT: no app.listen() for serverless
export default app;