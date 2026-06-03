import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL,
      subject: "New Lead",
      text: `${name} - ${email} - ${message}`,
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
}