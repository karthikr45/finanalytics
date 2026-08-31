import { Resend } from "resend";

// Runs in "mock mode" (logs instead of sending) whenever RESEND_API_KEY is
// unset — lets leads/notifications work end-to-end in this environment
// without a real Resend account. Drop a real key into .env to go live.
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!resend) {
    console.info(`[mailer:mock] to=${to} subject="${subject}"\n${html}`);
    return { mocked: true };
  }

  const from = process.env.EMAIL_FROM || "Akshara Finalytics <no-reply@aksharafinalytics.com>";
  const result = await resend.emails.send({ from, to, subject, html });
  return { mocked: false, result };
}
