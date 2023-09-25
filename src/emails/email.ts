import { Resend } from "resend";
import "dotenv/config";

export const sendEmail = (recipientEmail: string, products: string) => {
  const resendClient = new Resend(process.env.RESEND_API_KEY);
  resendClient.emails.send({
    from: "onboarding@resend.dev",
    to: recipientEmail,
    subject: `${products} is available - ${new Date().toLocaleString()}`,
    html: `<p>Hi there,</p> <p>${products} is available!</p>`,
  });
};
