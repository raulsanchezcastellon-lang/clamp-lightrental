import { Resend } from "resend";

const EMAIL_MAX_ATTEMPTS = 3;
const EMAIL_RETRY_DELAY_MS = 1500;
const DEFAULT_FROM = "CLAMP Light Rental <web@mail.clamp-lightrental.com>";

type MailOptions = {
  from?: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sendMailWithRetry(mailOptions: MailOptions) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  let lastError: unknown;

  for (let attempt = 1; attempt <= EMAIL_MAX_ATTEMPTS; attempt++) {
    const { error } = await resend.emails.send({
      from: mailOptions.from || DEFAULT_FROM,
      to: mailOptions.to,
      replyTo: mailOptions.replyTo,
      subject: mailOptions.subject,
      html: mailOptions.html,
    });

    if (!error) return;

    lastError = error;
    console.error(`Error sending email (attempt ${attempt}/${EMAIL_MAX_ATTEMPTS}):`, error);
    if (attempt < EMAIL_MAX_ATTEMPTS) {
      await sleep(EMAIL_RETRY_DELAY_MS * attempt);
    }
  }

  throw lastError;
}
