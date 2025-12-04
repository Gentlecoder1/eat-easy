import { type Request, type Response } from "express";
import { sendEmail } from "../utils/sendEmail";

export const sendVerificationCode = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, username } = req.body as { email?: string; username?: string };

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  const code = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP

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
    await sendEmail(email, "Your EatEasy verification code", html);
    return res.status(200).json({
      success: true,
      message: "Verification code sent to email",
      code,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
};
