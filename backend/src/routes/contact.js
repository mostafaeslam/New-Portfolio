import { Router } from "express";
import { body, validationResult } from "express-validator";
import { sendMail } from "../services/mailer.js";

const router = Router();

router.post(
  "/",
  [
    body("name").trim().isLength({ min: 2 }).withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("subject").trim().isLength({ min: 2 }).withMessage("Subject required"),
    body("message").trim().isLength({ min: 5 }).withMessage("Message required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        ok: false,
        errors: errors.array(),
        error: errors.array()[0]?.msg || "Validation failed",
      });
    }

    const { name, email, subject, message } = req.body;
    try {
      await sendMail({ name, email, subject, message });
      res.json({ ok: true, message: "Email sent successfully" });
    } catch (err) {
      console.error("Email send failed:", err);

      // Provide more helpful error messages
      let errorMessage = "Failed to send email";

      if (err.code === "EAUTH" || err.responseCode === 535) {
        errorMessage =
          "Email authentication failed. Please check SMTP credentials.";
      } else if (err.code === "ECONNECTION" || err.code === "ETIMEDOUT") {
        errorMessage =
          "Cannot connect to email server. Please check SMTP settings.";
      } else if (err.message) {
        errorMessage = err.message;
      }

      res.status(500).json({ ok: false, error: errorMessage });
    }
  }
);

export default router;
