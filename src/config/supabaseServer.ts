import { createClient } from "@supabase/supabase-js";

const readEnv = (keys: string[]): string => {
  for (const key of keys) {
    const viteVal = (import.meta as any)?.env?.[key];
    const nodeVal =
      typeof process !== "undefined" ? process.env[key] : undefined;
    const val = (viteVal ?? nodeVal) as string | undefined;
    if (val) return val;
  }
  throw new Error(`Missing required env: ${keys.join(" or ")}`);
};

// Prefer service role key on the server, fall back to anon for dev if needed
const supabaseUrl = readEnv(["SUPABASE_URL", "VITE_SUPABASE_URL"]);
const supabaseKey = readEnv([
  "SUPABASE_SERVICE_ROLE_KEY",
  "VITE_SUPABASE_SERVICE_ROLE_KEY",
  "VITE_SUPABASE_ANON_KEY",
]);

export const supabaseServer = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});
