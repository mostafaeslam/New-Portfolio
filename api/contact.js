import nodemailer from "nodemailer";

// Create transporter with validated credentials
function createTransporter(host, user, pass, port) {
  return nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465, // Use secure for port 465
    auth: {
      user,
      pass,
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

  // Check if SMTP credentials are configured (checking for non-empty strings)
  // Handle both undefined and empty string cases
  const smtpHostRaw = process.env.SMTP_HOST;
  const smtpUserRaw = process.env.SMTP_USER;
  const smtpPassRaw = process.env.SMTP_PASS;
  const smtpPortRaw = process.env.SMTP_PORT;

  const smtpHost = smtpHostRaw?.trim() || "";
  const smtpUser = smtpUserRaw?.trim() || "";
  const smtpPass = smtpPassRaw?.trim() || "";
  const smtpPort = smtpPortRaw?.trim() || "587";

  // Enhanced logging for debugging
  console.log("=== Environment Variable Check ===");
  console.log(
    "SMTP_HOST:",
    smtpHostRaw !== undefined
      ? smtpHost
        ? `✓ Set (${smtpHost.length} chars)`
        : "✗ Empty string"
      : "✗ Not defined"
  );
  console.log(
    "SMTP_USER:",
    smtpUserRaw !== undefined
      ? smtpUser
        ? `✓ Set (${smtpUser.length} chars)`
        : "✗ Empty string"
      : "✗ Not defined"
  );
  console.log(
    "SMTP_PASS:",
    smtpPassRaw !== undefined
      ? smtpPass
        ? `✓ Set (${smtpPass.length} chars)`
        : "✗ Empty string"
      : "✗ Not defined"
  );
  console.log(
    "SMTP_PORT:",
    smtpPortRaw !== undefined ? smtpPort : "587 (default)"
  );
  console.log(
    "MAIL_TO:",
    process.env.MAIL_TO ? "✓ Set" : "✗ Not set (will use SMTP_USER)"
  );

  // List all SMTP-related env vars
  const smtpEnvKeys = Object.keys(process.env).filter(
    (k) => k.startsWith("SMTP") || k === "MAIL_TO"
  );
  console.log(
    "Available SMTP env keys:",
    smtpEnvKeys.length > 0 ? smtpEnvKeys.join(", ") : "None found"
  );
  console.log("===================================");

  // Validate that all required variables are present and non-empty
  const missingVars = [];
  if (!smtpHost || smtpHost.length === 0) missingVars.push("SMTP_HOST");
  if (!smtpUser || smtpUser.length === 0) missingVars.push("SMTP_USER");
  if (!smtpPass || smtpPass.length === 0) missingVars.push("SMTP_PASS");

  if (missingVars.length > 0) {
    console.error(
      "❌ SMTP credentials not configured. Missing:",
      missingVars.join(", ")
    );
    console.error(
      "💡 Make sure environment variables are set in Vercel and the project has been redeployed."
    );
    return res.status(500).json({
      ok: false,
      error:
        "Email service not configured. Please contact the site administrator.",
    });
  }

  try {
    const transporter = createTransporter(
      smtpHost,
      smtpUser,
      smtpPass,
      smtpPort
    );
    const to = process.env.MAIL_TO?.trim() || smtpUser;

    const info = await transporter.sendMail({
      from: `Portfolio Contact <${smtpUser}>`,
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
