import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "node:path";
import { readFileSync } from "node:fs";
import { createHmac, timingSafeEqual } from "node:crypto";
import { fileURLToPath } from "node:url";
import { homepage } from "./data/homepage.js";

const app = express();
const backendDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// Load an optional local .env without adding a runtime dependency.
try {
  const envFile = readFileSync(path.join(backendDirectory, ".env"), "utf8");
  for (const line of envFile.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (match && process.env[match[1]] === undefined) process.env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, "$2");
  }
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const port = Number(process.env.PORT) || 3000;
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173,http://127.0.0.1:5174")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const publicDirectory = path.join(backendDirectory, "public");
const frontendBuildDirectory = path.resolve(backendDirectory, "../frontend/dist");

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    // Allow server-to-server and local tools that don't send an Origin header.
    if (!origin || allowedOrigins.includes(origin) || origin === process.env.RENDER_EXTERNAL_URL) return callback(null, true);
    return callback(new Error("Origin is not allowed by CORS"));
  }
}));
app.use(express.json({ limit: "32kb" }));
app.use("/assets", express.static(publicDirectory, { maxAge: 0 }));

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.post("/api/auth/login", (request, response) => {
  const { email, password } = request.body ?? {};
  if (typeof email !== "string" || typeof password !== "string" || email.length > 254 || password.length > 1024) {
    return response.status(400).json({ error: "Email va parolni to‘g‘ri kiriting." });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const managerEmail = process.env.MANAGER_EMAIL;
  const managerPassword = process.env.MANAGER_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;
  if (!adminEmail || !adminPassword || !jwtSecret) {
    return response.status(503).json({ error: "Login sozlanmagan. Backend uchun .env faylini yarating." });
  }

  const submittedEmail = Buffer.from(email.trim().toLowerCase());
  const submittedPassword = Buffer.from(password);
  const accounts = [
    { email: adminEmail, password: adminPassword, role: "admin" },
    ...(managerEmail && managerPassword ? [{ email: managerEmail, password: managerPassword, role: "manager" }] : [])
  ];
  const account = accounts.find(({ email: accountEmail, password: accountPassword }) => {
    const configuredEmail = Buffer.from(accountEmail.trim().toLowerCase());
    const configuredPassword = Buffer.from(accountPassword);
    const emailMatches = submittedEmail.length === configuredEmail.length && timingSafeEqual(submittedEmail, configuredEmail);
    const passwordMatches = submittedPassword.length === configuredPassword.length && timingSafeEqual(submittedPassword, configuredPassword);
    return emailMatches && passwordMatches;
  });
  if (!account) return response.status(401).json({ error: "Email yoki parol noto‘g‘ri." });

  const now = Math.floor(Date.now() / 1000);
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
  const accountEmail = account.email.trim().toLowerCase();
  const unsignedToken = `${encode({ alg: "HS256", typ: "JWT" })}.${encode({ sub: accountEmail, role: account.role, iat: now, exp: now + 60 * 60 * 8 })}`;
  const signature = createHmac("sha256", jwtSecret).update(unsignedToken).digest("base64url");
  return response.json({ token: `${unsignedToken}.${signature}`, expiresIn: 28800, user: { email: accountEmail, role: account.role } });
});

app.get("/api/auth/me", (request, response) => {
  const token = request.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  const jwtSecret = process.env.JWT_SECRET;
  if (!token || !jwtSecret) return response.status(401).json({ error: "Login talab qilinadi." });

  const parts = token.split(".");
  if (parts.length !== 3) return response.status(401).json({ error: "Sessiya yaroqsiz yoki muddati tugagan." });
  const unsignedToken = `${parts[0]}.${parts[1]}`;
  const expectedSignature = createHmac("sha256", jwtSecret).update(unsignedToken).digest();
  let actualSignature;
  let payload;
  try {
    actualSignature = Buffer.from(parts[2], "base64url");
    payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
  } catch {
    return response.status(401).json({ error: "Sessiya yaroqsiz yoki muddati tugagan." });
  }
  if (actualSignature.length !== expectedSignature.length || !timingSafeEqual(actualSignature, expectedSignature) || !payload.sub || !payload.exp || payload.exp <= Math.floor(Date.now() / 1000)) {
    return response.status(401).json({ error: "Sessiya yaroqsiz yoki muddati tugagan." });
  }
  const validAccounts = [
    { email: process.env.ADMIN_EMAIL, role: "admin" },
    { email: process.env.MANAGER_EMAIL, role: "manager" }
  ].filter((account) => account.email && account.role === payload.role);
  if (!validAccounts.some((account) => account.email.trim().toLowerCase() === payload.sub)) return response.status(401).json({ error: "Sessiya yaroqsiz yoki muddati tugagan." });
  return response.json({ user: { email: payload.sub, role: payload.role } });
});

app.get("/api/homepage", (_request, response) => {
  response.json({ data: homepage });
});

app.get("/api/homepage/clients", (_request, response) => {
  response.json({ data: homepage.clients });
});

app.get("/api/homepage/audiences", (_request, response) => {
  response.json({ data: homepage.audiences });
});

app.get("/api/homepage/stats", (_request, response) => {
  response.json({ data: homepage.stats });
});

app.get("/api/homepage/articles", (_request, response) => {
  response.json({ data: homepage.articles });
});

app.get("/api/homepage/social-links", (_request, response) => {
  response.json({ data: homepage.socialLinks });
});

// In production, the API also serves the built Vite app from the same origin.
app.use(express.static(frontendBuildDirectory, { maxAge: 0 }));

app.use((request, response) => {
  response.status(404).json({ error: "Not found", path: request.path });
});

app.use((error, _request, response, _next) => {
  if (error.message === "Origin is not allowed by CORS") {
    return response.status(403).json({ error: error.message });
  }
  console.error(error);
  return response.status(500).json({ error: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Landing page API listening on port ${port}`);
});
