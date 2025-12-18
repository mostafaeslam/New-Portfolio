import nodemailer from "nodemailer";

// Create transporter
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  // Validate required fields
  const { name, email, subject, message } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({
      ok: false,
      error: "Name is required (minimum 2 characters)",
    });
  }

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({
      ok: false,
      error: "Valid email is required",
    });
  }

  if (!subject || subject.trim().length < 2) {
    return res.status(400).json({
      ok: false,
      error: "Subject is required (minimum 2 characters)",
    });
  }

  if (!message || message.trim().length < 5) {
    return res.status(400).json({
      ok: false,
      error: "Message is required (minimum 5 characters)",
    });
  }

  // Check if SMTP credentials are configured
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("SMTP credentials not configured");
    return res.status(500).json({
      ok: false,
      error:
        "Email service not configured. Please contact the site administrator.",
    });
  }

  try {
    const transporter = createTransporter();
    const to = process.env.MAIL_TO || process.env.SMTP_USER;

    const info = await transporter.sendMail({
      from: `Portfolio Contact <${process.env.SMTP_USER}>`,
      to,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
<p><strong>Subject:</strong> ${subject}</p>
<p>${message.replace(/\n/g, "<br/>")}</p>`,
    });

    return res.status(200).json({
      ok: true,
      message: "Email sent successfully",
    });
  } catch (err) {
    console.error("Email send failed:", err);

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

    return res.status(500).json({
      ok: false,
      error: errorMessage,
    });
  }
}
