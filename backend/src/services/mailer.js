import nodemailer from "nodemailer";

// Check if email service is configured (checking for non-empty strings)
function isEmailConfigured() {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  return !!(
    host &&
    user &&
    pass &&
    host.length > 0 &&
    user.length > 0 &&
    pass.length > 0
  );
}

// Create transporter lazily only when needed
function getTransporter() {
  if (!isEmailConfigured()) {
    throw new Error(
      "Email service not configured. Please contact the site administrator."
    );
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST.trim(),
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_PORT === "465", // Use secure for port 465
    auth: {
      user: process.env.SMTP_USER.trim(),
      pass: process.env.SMTP_PASS.trim(),
    },
  });
}

export async function sendMail({ name, email, subject, message }) {
  // Check configuration before attempting to send
  if (!isEmailConfigured()) {
    throw new Error(
      "Email service not configured. Please contact the site administrator."
    );
  }

  const transporter = getTransporter();
  const to = process.env.MAIL_TO?.trim() || process.env.SMTP_USER?.trim();

  const info = await transporter.sendMail({
    from: `Portfolio Contact <${process.env.SMTP_USER.trim()}>`,
    to,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text: `From: ${name} <${email}>
\n${message}`,
    html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
<p><strong>Subject:</strong> ${subject}</p>
<p>${message.replace(/\n/g, "<br/>")}</p>`,
  });
  return info;
}
