// import { resend } from "@/lib/resend";
// import VerificationEmail from "@/emails/VerificationEmail";
import generateVerificationEmail from "../../emails/VerificationEmailNM";
import { ApiResponse } from "@/types/ApiResponse";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com"',
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {

    const emailHtml = generateVerificationEmail(username, verifyCode);

    const mailOption = {
      from: process.env.EMAIL, //Sender mail
      to: email, // Recever mail
      subject: "Mystery Message Verifivation Code",
      html: emailHtml,
    };
    const response = await transporter.sendMail(mailOption);
    console.log("response", response);
    if(response.rejected.length > 0){
      return { success: true, message: "Verification email sent" };
    } 
    // const em = await resend.emails.send({
    //   from: "onboarding@resend.dev",
    //   to: email,
    //   subject: "Mystery Message Verifivation Code",
    //   react: VerificationEmail({ username, otp: verifyCode }),
    // });
    // if (em.error) {
    //   console.error("Failed to send verification email", em.error);
    //   return { success: false, message: "Failed to send verification email" };
    // }
    return { success: true, message: "Verification email sent" };
  } catch (error) {
    console.error("Failed to send verification email", error);
    return { success: false, message: "Failed to send verification email" };
  }
}
