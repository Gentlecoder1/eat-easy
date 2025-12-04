import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRoutes);

const port = Number(process.env.SERVER_PORT || 5174);

export function startServer() {
  app.listen(port, () => {
    console.log(`API server running on http://localhost:${port}`);
  });
}

// Auto-start when run directly via ts-node or node
if (import.meta.env?.MODE === undefined) {
  startServer();
}
