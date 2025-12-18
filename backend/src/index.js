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
app.listen(port, () => console.log(`Backend listening on :${port}`));
