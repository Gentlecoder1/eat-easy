import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

function generateOtp(): string {
  return String(Math.floor(1000 + Math.random() * 9000));
}

function htmlTemplate(code: string, username?: string) {
  return `
  <div style="font-family:Inter,Segoe UI,Arial,sans-serif;background:#f6f7fb;padding:24px;color:#1f2937">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;border:1px solid #e5e7eb">
      <div style="padding:24px 24px 8px;font-weight:600;font-size:18px;color:#111827">Verify your email</div>
      <div style="padding:0 24px 16px;color:#6b7280">${
        username ? `Hi ${username},` : ""
      } Use the code below to verify your email address. This code expires in 10 minutes.</div>
      <div style="padding:0 24px 24px">
        <div style="display:inline-block;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:16px 24px;font-size:28px;letter-spacing:8px;font-weight:700;color:#111827">${code}</div>
      </div>
      <div style="padding:0 24px 24px;color:#6b7280;font-size:12px">If you didn't request this, you can safely ignore this email.</div>
    </div>
    <div style="max-width:560px;margin:12px auto 0;text-align:center;color:#9ca3af;font-size:12px">Eat Easy</div>
  </div>`;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { email, username } = req.body || {};
    if (!email) return res.status(400).json({ error: "Email is required" });

    // 1) Check if email already exists (admin SDK)
    const { data: list, error: listErr } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 200,
    });
    if (listErr)
      return res.status(500).json({ error: "Failed to check existing user" });
    const exists = list?.users?.some(
      (u: any) => u.email?.toLowerCase() === String(email).toLowerCase()
    );
    if (exists)
      return res
        .status(409)
        .json({ error: "An account with this email already exists." });

    // 2) Generate + persist OTP (10 min expiry)
    const code = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    const { error: insertErr } = await supabase
      .from("email_otp")
      .insert({ email, code, expires_at: expiresAt, consumed: false });

    if (insertErr) {
      return res
        .status(500)
        .json({ error: "Failed to create verification code" });
    }

    // 3) Send email via nodemailer (SMTP)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Boolean(
        process.env.SMTP_SECURE === "true" ||
          Number(process.env.SMTP_PORT) === 465
      ),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    } as any);

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: "Your Eat Easy verification code",
      html: htmlTemplate(code, username),
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: "Unexpected error" });
  }
}

export const config = {
  runtime: "nodejs18.x",
};
