import { type Request, type Response } from "express";
import { sendEmail } from "../utils/sendEmail";
import { supabase } from "../config/supabaseClient";

type CodeRecord = { code: string; expiresAt: number };
const codeStore = new Map<string, CodeRecord>();

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
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

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
    codeStore.set(email, { code: String(code), expiresAt });
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

export const verifyCode = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, code } = req.body as { email?: string; code?: string };

  if (!email || !code) {
    return res
      .status(400)
      .json({ success: false, message: "Email and code are required" });
  }

  const record = codeStore.get(email);
  if (!record) {
    return res
      .status(400)
      .json({ success: false, message: "No code requested for this email" });
  }

  if (Date.now() > record.expiresAt) {
    codeStore.delete(email);
    return res.status(400).json({ success: false, message: "Code expired" });
  }

  if (String(code) !== record.code) {
    return res.status(400).json({ success: false, message: "Invalid code" });
  }

  codeStore.delete(email);
  // Fetch basic user info to return with success
  let user: { username?: string; email?: string } | null = null;
  try {
    const { data } = await supabase
      .from("eat-easy-profile")
      .select("username,email")
      .eq("email", email)
      .limit(1)
      .maybeSingle();
    if (data) user = data as any;
  } catch (_) {
    // ignore errors
  }
  return res.status(200).json({ success: true, user });
};
