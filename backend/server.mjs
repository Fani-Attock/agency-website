import express from "express";

const app = express();

app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.json({ message: "Backend running 🚀" });
});

// IMPORTANT for Vercel
export default app;