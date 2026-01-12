import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import contactRouter from "./routes/contact.js";

const app = express();

app.use(helmet());
app.use(express.json());
// CORS configuration
const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : [
      "https://mostafaeslam.github.io",
      "http://localhost:8000",
      "http://localhost:3000",
      "http://127.0.0.1:8000",
    ];

app.use(
  cors({
    origin: corsOrigins,
    methods: ["POST", "GET", "OPTIONS"],
    credentials: true,
  })
);
app.use(morgan("tiny"));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
});
app.use("/api/", limiter);

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api/contact", contactRouter);

const port = process.env.PORT || 3001;

// Check email configuration on startup
const smtpHost = process.env.SMTP_HOST?.trim();
const smtpUser = process.env.SMTP_USER?.trim();
const smtpPass = process.env.SMTP_PASS?.trim();

if (smtpHost && smtpUser && smtpPass) {
  console.log("✓ Email service configured");
  console.log(`  SMTP Host: ${smtpHost}`);
  console.log(`  SMTP User: ${smtpUser}`);
  console.log(`  SMTP Port: ${process.env.SMTP_PORT || 587}`);
} else {
  console.warn("⚠ Email service NOT configured");
  console.warn("  Missing environment variables:");
  if (!smtpHost) console.warn("    - SMTP_HOST");
  if (!smtpUser) console.warn("    - SMTP_USER");
  if (!smtpPass) console.warn("    - SMTP_PASS");
}

app.listen(port, () => console.log(`Backend listening on :${port}`));
