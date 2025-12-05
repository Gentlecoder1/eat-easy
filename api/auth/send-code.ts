import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, username, phoneNumber, password } = req.body as {
    email?: string;
    username?: string;
    phoneNumber?: string;
    password?: string;
  };

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return res
      .status(500)
      .json({ success: false, message: "Supabase env not configured" });
  }
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  try {
    const { data: existing, error: existingErr } = await supabase
      .from("eat_easy_profile")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingErr) {
      console.error("Supabase error checking existing user:", existingErr);
      return res.status(500).json({
        success: false,
        message: "Failed to check existing user",
        detail: existingErr?.message || String(existingErr),
      });
    }

    if (!existing) {
      // First-time signup: require details and create profile
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: "Username and password are required",
        });
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const { error: insertErr } = await supabase
        .from("eat_easy_profile")
        .insert([
          {
            username,
            email,
            phone_number: phoneNumber ?? null,
            password: passwordHash,
          },
        ]);
      if (insertErr) {
        console.error("Supabase profile insert error:", insertErr);
        const status = insertErr.code === "23505" ? 409 : 500;
        const msg =
          insertErr.code === "23505"
            ? "Email already registered. Please log in."
            : "Failed to create profile";
        return res.status(status).json({
          success: false,
          message: msg,
          detail: insertErr.message || String(insertErr),
        });
      }
    } else if (username || password) {
      // Existing user attempting to sign up again
      return res.status(409).json({
        success: false,
        message: "Email already registered. Please log in.",
      });
    }

    // Create code and store
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const { error: upsertErr } = await supabase
      .from("verification_codes")
      .upsert([{ email, code, expires_at: expiresAt.toISOString() }], {
        onConflict: "email",
      });
    if (upsertErr) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to store verification code" });
    }

    // Send email with code
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

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

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your EatEasy verification code",
      html,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log("SEND-CODE ERROR:", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
