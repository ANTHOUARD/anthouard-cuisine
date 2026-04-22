export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { action, code, messages, maxTokens } = req.body || {};

  // ── Vérification code d'accès ─────────────────────────────────────────────
  if (action === "auth") {
    const codes = (process.env.ACCESS_CODES || "ANTHOUARD2025")
      .split(",").map(c => c.trim().toUpperCase());
    const valid = codes.includes((code || "").toUpperCase().trim());
    return res.json({ ok: valid });
  }

  // ── Vérification code avant chaque appel IA ───────────────────────────────
  const codes = (process.env.ACCESS_CODES || "ANTHOUARD2025")
    .split(",").map(c => c.trim().toUpperCase());
  if (!codes.includes((code || "").toUpperCase().trim())) {
    return res.status(401).json({ error: "Code d'accès invalide" });
  }

  // ── Appel Claude ──────────────────────────────────────────────────────────
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Clé API non configurée" });

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: maxTokens || 3000,
        messages
      })
    });
    const data = await response.json();
    if (data.error) return res.status(400).json({ error: data.error.message });
    return res.json({ content: data.content });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
