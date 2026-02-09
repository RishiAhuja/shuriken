import { Resend } from "resend";

// Lazy initialization to avoid errors during build when RESEND_API_KEY is not set
let _resendClient: Resend | null = null;

export const getResendClient = () => {
  _resendClient ??= new Resend(process.env.RESEND_API_KEY);
  return _resendClient;
};

export const emailConfig = {
  from: process.env.RESEND_FROM_EMAIL || "noreply@example.com",
  defaultSubject: "Application Notification",
} as const;
