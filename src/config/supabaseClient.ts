import { createClient } from "@supabase/supabase-js";

const readEnv = (key: string): string => {
  const viteVal = (import.meta as any)?.env?.[key];
  const nodeVal = typeof process !== "undefined" ? process.env[key] : undefined;
  const val = (viteVal ?? nodeVal) as string | undefined;
  if (!val) {
    throw new Error(`Missing required env: ${key}`);
  }
  return val;
};

const supabaseUrl = readEnv("VITE_SUPABASE_URL");
const supabaseKey = readEnv("VITE_SUPABASE_ANON_KEY");

export const supabase = createClient(supabaseUrl, supabaseKey);
