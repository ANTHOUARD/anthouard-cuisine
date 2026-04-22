import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ── Configuration ─────────────────────────────────────────────────────────────
// Définissez ces variables dans votre hébergeur (Render, Railway, etc.)
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || "";
const ACCESS_CODES = (process.env.ACCESS_CODES || "ANTHOUARD2025").split(",").map(c => c.trim().toUpperCase());
const PORT = process.env.PORT || 3000;

// ── Auth middleware