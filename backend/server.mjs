import express from "express"
import cors from "cors"
import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.use(cors({
  origin: "http://localhost:5173"
}))

app.use(express.json())

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

app.listen(5000, () => {
  console.log("Backend running on port 5000")
})