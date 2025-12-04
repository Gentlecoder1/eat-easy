import { codeStore } from "./codeStore";

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

  const record = codeStore.get(email);
  if (!record) {
    return res
      .status(400)
      .json({ success: false, message: "No code requested for this email" });
  }

  if (Date.now() > record.expiresAt) {
    codeStore.delete(email);
    return res.status(400).json({ success: false, message: "Code expired" });
  }

  if (record.code !== code) {
    return res.status(400).json({ success: false, message: "Invalid code" });
  }

  codeStore.delete(email);
  return res.status(200).json({ success: true });
}
