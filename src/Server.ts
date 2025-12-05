import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import { supabaseServer } from "./config/supabaseServer";

dotenv.config();

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRoutes);

// Dev helper: test Supabase connectivity via Express
app.get("/api/test-supabase", async (_req, res) => {
  try {
    const { data, error } = await supabaseServer
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
});

const port = Number(process.env.SERVER_PORT || 5174);

export function startServer() {
  app.listen(port, () => {
    console.log(`API server running on http://localhost:${port}`);
  });
}

startServer();
