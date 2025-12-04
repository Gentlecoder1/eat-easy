import nodemailer from "nodemailer";
import { codeStore } from "./codeStore";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, username } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email required" });
  }

  const code = Math.floor(1000 + Math.random() * 9000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Must be Gmail APP password
    },
  });

  // Match local email styling from controllers/authControllers.ts
  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6;">
      <h2 style="margin: 0 0 8px;">Welcome${
        username ? ", " + username : ""
      } to EatEasy!</h2>
      <p style="margin: 0 0 16px;">Use the verification code below to continue your sign up.</p>
      <div style="display:inline-block;padding:12px 16px;border-radius:12px;background:#6C45CE;color:#fff;font-weight:700;font-size:24px;letter-spacing:6px;">${code}</div>
      <p style="margin:16px 0 0;color:#666;font-size:14px;">This code expires in 10 minutes. If you didn't request this, you can ignore this email.</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your EatEasy verification code",
      html,
    });

    codeStore.set(email, { code, expiresAt });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log("EMAIL ERROR:", err);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send email" });
  }
}
