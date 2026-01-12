import nodemailer from "nodemailer";

// Check if email service is configured
function isEmailConfigured() {
  return !!(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
  );
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendMail({ name, email, subject, message }) {
  // Check configuration before attempting to send
  if (!isEmailConfigured()) {
    throw new Error(
      "Email service not configured. Please contact the site administrator."
    );
  }

  const to = process.env.MAIL_TO || process.env.SMTP_USER;
  const info = await transporter.sendMail({
    from: `Portfolio Contact <${process.env.SMTP_USER}>`,
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
