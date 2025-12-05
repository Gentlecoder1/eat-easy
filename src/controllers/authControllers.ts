import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendEmail";
import { supabaseServer } from "../config/supabaseServer";

export const sendVerificationCode = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, username, phoneNumber, password } = req.body as {
    email?: string;
    username?: string;
    phoneNumber?: string;
    password?: string;
  };

  try {
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    // Check if email already exists
    const { data: existingUser, error: existingErr } = await supabaseServer
      .from("eat_easy_profile")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingErr) {
      console.error("Supabase error checking existing user:", existingErr);
      return res.status(500).json({
        success: false,
        message: "Failed to check existing user",
        detail:
          process.env.NODE_ENV === "production"
            ? undefined
            : existingErr?.message || String(existingErr),
      });
    }

    // If user doesn't exist, require full details and create profile
    if (!existingUser) {
      if (!email || !username || !password) {
        return res.status(400).json({
          success: false,
          message: "Username, email and password are required",
        });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const { error: insertProfileErr } = await supabaseServer
        .from("eat_easy_profile")
        .insert([
          {
            username,
            email,
            phone_number: phoneNumber ?? null,
            password: passwordHash,
          },
        ]);

      if (insertProfileErr) {
        console.error("Supabase profile insert error:", insertProfileErr);
        // If unique constraint races, surface as already registered
        const msg =
          insertProfileErr.code === "23505"
            ? "Email already registered. Please log in."
            : "Failed to create profile";
        const status = insertProfileErr.code === "23505" ? 409 : 500;
        return res.status(status).json({
          success: false,
          message: msg,
          detail:
            process.env.NODE_ENV === "production"
              ? undefined
              : insertProfileErr.message || String(insertProfileErr),
        });
      }
    } else if (username || password) {
      // Existing user attempting to sign up again -> block
      return res.status(409).json({
        success: false,
        message: "Email already registered. Please log in.",
      });
    }

    // Generate and store verification code
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

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
    // Upsert verification code for email
    const { error: upsertErr } = await supabaseServer
      .from("verification_codes")
      .upsert(
        [
          {
            email,
            code,
            expires_at: expiresAt.toISOString(),
          },
        ],
        { onConflict: "email" }
      );

    if (upsertErr) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to store verification code" });
    }

    await sendEmail(email, "Your EatEasy verification code", html);
    return res
      .status(200)
      .json({ success: true, message: "Verification code sent to email" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
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

  try {
    const { data: vc, error } = await supabaseServer
      .from("verification_codes")
      .select("code, expires_at")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      console.error("Supabase error reading verification code:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to check code",
        detail:
          process.env.NODE_ENV === "production"
            ? undefined
            : error?.message || String(error),
      });
    }

    if (!vc) {
      return res
        .status(400)
        .json({ success: false, message: "No code requested for this email" });
    }

    const expMs = new Date(vc.expires_at as unknown as string).getTime();
    if (Date.now() > expMs) {
      await supabaseServer
        .from("verification_codes")
        .delete()
        .eq("email", email);
      return res.status(400).json({ success: false, message: "Code expired" });
    }

    if (String(code) !== vc.code) {
      return res.status(400).json({ success: false, message: "Invalid code" });
    }

    await supabaseServer.from("verification_codes").delete().eq("email", email);

    return res.status(200).json({ success: true });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
