import express from "express"
import cors from "cors"
import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { GoogleGenAI } from "@google/genai"

dotenv.config()

console.log('🚀 BACKEND STARTING NOW')
console.log('API Key loaded:', process.env.GEMINI_API_KEY ? 'YES' : 'NO')

const app = express()

app.use(cors({
  origin: "http://localhost:5173"
}))

app.use(express.json())

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields required" })
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS
    }
  })

  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: "New AI Agency Lead",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  }

  try {
    await transporter.sendMail(mailOptions)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

app.post("/api/chat", async (req, res) => {
  console.log('📨 Chat request received:', req.body.message)

  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({ reply: "Message is required." })
    }

    const apiKey = process.env.GEMINI_API_KEY

    console.log(
      'API Key check:',
      apiKey ? 'EXISTS' : 'MISSING',
      'Length:',
      apiKey?.length
    )

    // Demo mode if no API key
    if (!apiKey || apiKey.includes("your_")) {
      console.log('Using DEMO mode')

      const demoResponses = {
        services: "NeuraFlow AI offers: AI Automation, Computer Vision, Machine Learning, Deep Learning, and AI SaaS Development.",
        automation: "Our AI Automation services include orchestration, scheduling, monitoring, and MLOps to keep models healthy in production.",
        "computer vision": "We build AI image analysis, object detection, tracking systems, and smart monitoring solutions.",
        "machine learning": "Our ML expertise covers predictive analytics, intelligent forecasting, and custom trained systems.",
        "deep learning": "We develop advanced neural networks for NLP, speech AI, recommendation engines, and LLM workflows.",
        default: "NeuraFlow AI is a premium AI automation agency. We build production-ready AI systems, automation workflows, and secure enterprise systems."
      }

      let response = demoResponses.default
      const msg = message.toLowerCase()

      if (msg.includes("service") || msg.includes("offer")) {
        response = demoResponses.services
      } else if (msg.includes("automation")) {
        response = demoResponses.automation
      } else if (msg.includes("vision")) {
        response = demoResponses["computer vision"]
      } else if (msg.includes("machine") || msg.includes("ml")) {
        response = demoResponses["machine learning"]
      } else if (msg.includes("deep") || msg.includes("neural")) {
        response = demoResponses["deep learning"]
      }

      console.log('Demo response:', response)

      return res.json({
        reply: response
      })
    }

    console.log('Using REAL Gemini API')

    const systemPrompt = `
You are NeuraFlow AI, a professional AI agency assistant.

Services:
- AI Automation
- AI Agents
- Machine Learning
- Deep Learning
- Computer Vision
- AI SaaS Development
- Workflow Automation
- Custom AI Solutions

Keep responses concise, professional, and helpful.
`

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${systemPrompt}\n\nUser: ${message}`
    })

    const aiText =
      result.text ||
      "NeuraFlow AI: I couldn't process that request. Please try again."

    console.log('Gemini response:', aiText)

    res.json({
      reply: aiText
    })

  } catch (error) {
    console.error('CATCH ERROR:', error)

    res.status(500).json({
      reply: `Server error: ${error.message}`
    })
  }
})

app.listen(5000, () => {
  console.log("Backend running on port 5000")
})