import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { email, code } = req.body || {};
    if (!email || !code)
      return res.status(400).json({ error: "Email and code are required" });

    // Find most recent unconsumed + unexpired code for this email
    const { data: rows, error } = await supabase
      .from("email_otp")
      .select("id, code, expires_at, consumed")
      .eq("email", email)
      .eq("consumed", false)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error)
      return res
        .status(500)
        .json({ error: "Failed to read verification code" });
    const row = rows?.[0];
    if (!row) return res.status(400).json({ error: "Invalid or expired code" });

    const isExpired = new Date(row.expires_at).getTime() < Date.now();
    if (isExpired)
      return res.status(400).json({ error: "Verification code has expired" });

    if (String(row.code) !== String(code)) {
      return res.status(400).json({ error: "Incorrect verification code" });
    }

    // Mark consumed
    const { error: updErr } = await supabase
      .from("email_otp")
      .update({ consumed: true })
      .eq("id", row.id);

    if (updErr)
      return res.status(500).json({ error: "Failed to finalize verification" });

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: "Unexpected error" });
  }
}

export const config = {
  runtime: "nodejs",
};
