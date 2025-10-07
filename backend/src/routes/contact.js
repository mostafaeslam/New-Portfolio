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
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;
    try {
      await sendMail({ name, email, subject, message });
      res.json({ ok: true });
    } catch (err) {
      console.error("Email send failed:", err);
      res.status(500).json({ ok: false, error: "Failed to send email" });
    }
  }
);

export default router;
