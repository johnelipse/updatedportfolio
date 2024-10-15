/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { sendNewsletterEmail } from "@/components/email-templates/Newsletter";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
export type MailDataProps = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendArticleToSingleMail(data: MailDataProps) {
  const { name, email, subject, message } = data;
  console.log(name, email, subject, message, `this is the data`);

  try {
    // Send welcome email
    //<info@kyaja.com>

    const res = await resend.emails.send({
      from: `${data.email} <info@kyaja.com>`,
      to: "johnelipse472@gmail.com",
      subject: data.subject,
      html: sendNewsletterEmail(name, subject, message),
    });
    console.log(res);
    revalidatePath("/");
    return {
      success: true,
      message: "Message Sent",
      status: 200,
    };
  } catch (error) {
    console.error("Error processing course offer submission:", error);
    return {
      success: false,
      message: "An error occurred while processing your request.",
      status: 403,
    };
  }
}
