import nodemailer from "nodemailer";

const EMAIL_MAX_ATTEMPTS = 3;
const EMAIL_RETRY_DELAY_MS = 1500;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getSmtpTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendMailWithRetry(
  mailOptions: Parameters<nodemailer.Transporter["sendMail"]>[0]
) {
  const transporter = getSmtpTransporter();
  let lastError: unknown;

  for (let attempt = 1; attempt <= EMAIL_MAX_ATTEMPTS; attempt++) {
    try {
      await transporter.sendMail(mailOptions);
      return;
    } catch (error) {
      lastError = error;
      console.error(`Error sending email (attempt ${attempt}/${EMAIL_MAX_ATTEMPTS}):`, error);
      if (attempt < EMAIL_MAX_ATTEMPTS) {
        await sleep(EMAIL_RETRY_DELAY_MS * attempt);
      }
    }
  }

  throw lastError;
}
