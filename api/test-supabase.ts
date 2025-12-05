import { createClient } from "@supabase/supabase-js";

export default async function handler(req: any, res: any) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({
      success: false,
      message: "Supabase env not configured",
    });
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  try {
    // Use a simple read to verify connectivity and permissions
    const { data, error } = await supabase
      .from("eat_easy_profile")
      .select("id")
      .limit(1);

    if (error) {
      console.error("Supabase test error:", error);
      return res.status(500).json({ success: false, error: error.message });
    }

    return res.json({ success: true, ok: true, sample: data });
  } catch (err) {
    console.error("Unhandled test error:", err);
    return res.status(500).json({ success: false, error: String(err) });
  }
}
