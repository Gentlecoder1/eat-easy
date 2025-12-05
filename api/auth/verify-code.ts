import { createClient } from "@supabase/supabase-js";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, code } = req.body;

  if (!email || !code) {
    return res
      .status(400)
      .json({ success: false, message: "Email and code required" });
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
    const { data: vc, error } = await supabase
      .from("verification_codes")
      .select("code, expires_at")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to check code" });
    }
    if (!vc) {
      return res
        .status(400)
        .json({ success: false, message: "No code requested for this email" });
    }

    const exp = new Date(vc.expires_at as unknown as string).getTime();
    if (Date.now() > exp) {
      await supabase.from("verification_codes").delete().eq("email", email);
      return res.status(400).json({ success: false, message: "Code expired" });
    }

    if (vc.code !== code) {
      return res.status(400).json({ success: false, message: "Invalid code" });
    }

    await supabase.from("verification_codes").delete().eq("email", email);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}
